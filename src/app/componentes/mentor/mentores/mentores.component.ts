import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MentorService } from './../../../services/mentor.service';
import { Mentor } from './../../../models/mentorModel';
import { MatPaginator } from '@angular/material/paginator';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-mentores',
  templateUrl: './mentores.component.html',
  styleUrls: ['./mentores.component.scss']
})
export class MentoresComponent implements OnInit {

  closeResult = '';

  // Variável para mat-table
  displayedColumns: string[] = [
    'id',
    'nome',
    'cpf',
    'cargo',
    'foto',
    'id_mentorado',
    'cargo_mentorado',
    'bonificacao',
    'acoes'
  ];

  // Variável para armazenar os mentores na tabela
  tabelaMentor: any;

  // sort
  @ViewChild(MatSort) sort!: MatSort;

  // paginator
  @ViewChild("paginatorMentor") paginatorFunc!: MatPaginator;
  // estabelecendo breakpoint do paginator
  bpPaginator: boolean = false;

  mentores: any = []

  constructor(private mentorService: MentorService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.mostrarTodosMentores()
  }

  mostrarTodosMentores() {
    this.mentorService.mostrarTodosMentores().subscribe(resultado => {

      console.log(resultado)

      resultado.forEach((mentor: any[]) => {

        let mentorComCargo: any = {
          id_mentor: '',
          mentor_nome: '',
          mentor_cpf: '',
          mentor_foto: '',
          mentor_cargo: '',
          id_cargo: '',
          car_nome: '',
          car_atribuicao: ''
        }

        mentorComCargo.id_mentor = mentor[0]
        mentorComCargo.mentor_nome = mentor[1]
        mentorComCargo.mentor_cargo = mentor[2]
        mentorComCargo.mentor_cpf = mentor[3]
        mentorComCargo.mentor_foto = mentor[4]
        if (mentor[5] != null) {
          mentorComCargo.id_cargo = mentor[5]
          mentorComCargo.car_nome = mentor[6]
          mentorComCargo.car_atribuicao = mentor[7]
        } else {
          mentorComCargo.id_cargo = "0"
          mentorComCargo.car_nome = "----"
          mentorComCargo.car_atribuicao = "----"
        }
        this.mentores.push(mentorComCargo)
        this.tabelaMentor = this.mentores

        console.log(resultado)
      });

      this.tabelaMentor = new MatTableDataSource(this.mentores);
      this.tabelaMentor.paginator = this.paginatorFunc;
      this.tabelaMentor.sort = this.sort;
    })
  }

  filtrar(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tabelaMentor.filter = filterValue.trim().toLowerCase();

    if (this.tabelaMentor.paginator) {
      this.tabelaMentor.paginator.firstPage();
    }
  }

  // Função para abrir modal
  open(content: any) {
    //formato do modal
    this.modalService.open(content, { size: 'md' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  } //open

  // Função para fechar modal
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  } //getDismissReason

}
