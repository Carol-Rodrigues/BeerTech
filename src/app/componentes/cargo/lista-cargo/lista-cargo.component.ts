import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { CargosService } from 'src/app/services/cargos.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-lista-cargo',
  templateUrl: './lista-cargo.component.html',
  styleUrls: ['./lista-cargo.component.scss']
})
export class ListaCargoComponent implements OnInit {

  cargos: any = [];

  // Variável para mat-table
  displayedColumns: string[] = [
    'id',
    'nome',
    'atribuicao',
    'nome_mentor',
    'cargo_mentor',
    'acoes'
  ];

  id_cargo: any = ""

  // Variável para armazenar os func na tabela
  tabelaCargo: any;

  // paginator
  @ViewChild("paginatorCargo") paginatorCargo!: MatPaginator;
  // estabelecendo breakpoint do paginator
  bpPaginator: boolean = false;

  // sort
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private cargosService: CargosService, private route: ActivatedRoute) {
    this.id_cargo = this.route.snapshot.paramMap.get("id_cargo")!
  }

  ngOnInit(): void {
    this.mostrarCargos()
  }

  mostrarCargos() {
    this.cargosService.buscarTodosCargos().subscribe(resultado => {
      console.log("aqui")
      console.log(this.cargos)

      resultado.forEach((cargo: any[]) => {

        let cargoComMentor: any = {
          id_cargo: '',
          car_nome: '',
          car_atribuicao: '',
          id_mentor: '',
          mentor_nome: '',
          mentor_cargo: ''
        }

        cargoComMentor.id_cargo = cargo[0]
        cargoComMentor.car_nome = cargo[1]
        cargoComMentor.car_atribuicao = cargo[2]
        if (cargo[3] != null) {
          cargoComMentor.id_mentor = cargo[3]
          cargoComMentor.mentor_nome = cargo[4]
          cargoComMentor.mentor_cargo = cargo[5]
        } else {
          cargoComMentor.id_mentor = 0
          cargoComMentor.mentor_nome = "----"
          cargoComMentor.mentor_cargo = "----"
        }

        this.cargos.push(cargoComMentor)
        console.log(this.cargos)

      });

      this.tabelaCargo = new MatTableDataSource(this.cargos);
      this.tabelaCargo.paginator = this.paginatorCargo;
      this.tabelaCargo.sort = this.sort;
    })
  }

  filtrar(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tabelaCargo.filter = filterValue.trim().toLowerCase();

    if (this.tabelaCargo.paginator) {
      this.tabelaCargo.paginator.firstPage();
    }
  }

}
