import { ActivatedRoute } from '@angular/router';
import { MentorService } from './../../../services/mentor.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-mentor',
  templateUrl: './lista-mentor.component.html',
  styleUrls: ['./lista-mentor.component.scss']
})
export class ListaMentorComponent implements OnInit {

  mentores: any = [];

  constructor(private mentorService: MentorService, private route: ActivatedRoute) {

  }

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

        console.log(mentorComCargo.mentor_nome)
      });
    })
  }

}
