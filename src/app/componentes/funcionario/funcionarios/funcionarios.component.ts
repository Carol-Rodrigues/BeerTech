import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FuncionariosService } from '../../../services/funcionarios.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { BreakpointObserver } from '@angular/cdk/layout';
import { tap } from 'rxjs';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-funcionarios',
  templateUrl: './funcionarios.component.html',
  styleUrls: ['./funcionarios.component.scss']
})
export class FuncionariosComponent implements OnInit {

  // Variável para mat-table
  displayedColumns: string[] = [
    'id',
    'nome',
    'cidade',
    'cargo'
  ];

  // Variável para armazenar os func na tabela
  tabelaFunc: any;

  // paginator
  @ViewChild("paginatorFunc") paginatorFunc!: MatPaginator;
  // estabelecendo breakpoint do paginator
  bpPaginator: boolean = false;

  // sort
  @ViewChild(MatSort) sort!: MatSort;

  funcionarios: any[] = []

  constructor(private funcService: FuncionariosService, private modalService: NgbModal, private observer: BreakpointObserver) { }

  ngOnInit(): void {
    this.mostrarTodosFuncs()

    // função para esconder o paginator em telas abaixo de 450px. Se possui a width mínima, a página receberá a variável do paginator criada para cada uma das tabelas. Caso o tamanho seja inferior ao mínimo, o null não permitirá que o paginator apareça.
    // o observe irá ler o parâmetro que passarmos na string
    // this.observer.observe([
    //   '(min-width: 450px)'
    // ]).pipe(
    //   tap((resultado: any) => this.bpPaginator = resultado.matches)
    // ).subscribe((resultado: any) => {
    //   if (resultado.matches) {
    //     this.tabelaFunc.paginator = this.tabelaFunc;
    //   } else {
    //     this.tabelaFunc.paginator = null;
    //   }
    // });
  }

  ngAfterViewInit (){
  }

  mostrarTodosFuncs() {
    this.funcService.funcsComCargos().subscribe((resultado) => {
      console.log(resultado)

      resultado.forEach((func: any) => {

        let funcsECargos: any = {
          id_funcionario: "",
          func_nome: "",
          func_cidade: "",
          car_nome: "",
          car_atribuicao: ""
        }

        funcsECargos.id_funcionario = func[0],
        funcsECargos.func_nome = func[1],
        funcsECargos.func_cidade = func[2],
        funcsECargos.car_nome = func[3],
        funcsECargos.car_atribuicao = func[4]

        this.funcionarios.push(funcsECargos)
        // console.log(func)
      });

      this.tabelaFunc = new MatTableDataSource(this.funcionarios);
      this.tabelaFunc.paginator = this.paginatorFunc;
      this.tabelaFunc.sort = this.sort;
    })
  }

  filtrar(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tabelaFunc.filter = filterValue.trim().toLowerCase();

    if (this.tabelaFunc.paginator) {
      this.tabelaFunc.paginator.firstPage();
    }
  }
}