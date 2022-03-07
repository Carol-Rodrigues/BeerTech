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

  // Variável para mat-table
  displayedColumns: string[] = [
    'id',
    'nome',
    'cargo',
    'id_mentorado',
    'cargo_mentorado',
    'atrib_mentorado'
  ];

  // Variável para armazenar os mentores na tabela
  tabelaMentor: any;

  // paginator
  @ViewChild("paginatorMentor") paginatorFunc!: MatPaginator;
  // estabelecendo breakpoint do paginator
  bpPaginator: boolean = false;

  mentores: any = []

  constructor(private mentorService: MentorService) { }

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
          mentor_cargo: '',
          id_cargo: '',
          car_nome: '',
          car_atribuicao: ''
        }

        mentorComCargo.id_mentor = mentor[0]
        mentorComCargo.mentor_nome = mentor[1]
        mentorComCargo.mentor_cargo = mentor[2]
        if (mentor[3] != null) {
          mentorComCargo.id_cargo = mentor[3]
          mentorComCargo.car_nome = mentor[4]
          mentorComCargo.car_atribuicao = mentor[5]
        } else {
          mentorComCargo.id_cargo = "0"
          mentorComCargo.car_nome = "----"
          mentorComCargo.car_atribuicao = "----"
        }
        this.mentores.push(mentorComCargo)
        this.tabelaMentor = this.mentores
      });
    })
  }

  filtrar(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tabelaMentor.filter = filterValue.trim().toLowerCase();

    if (this.tabelaMentor.paginator) {
      this.tabelaMentor.paginator.firstPage();
    }
  }

}
