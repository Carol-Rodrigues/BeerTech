import { Mentor } from './../../../models/mentorModel';
import { MentorService } from './../../../services/mentor.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FuncionariosService } from './../../../services/funcionarios.service';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-editar-mentor',
  templateUrl: './editar-mentor.component.html',
  styleUrls: ['./editar-mentor.component.scss']
})
export class EditarMentorComponent implements OnInit {


  form!: FormGroup

  mentor: Mentor = {
    mentor_nome: "",
    mentor_cargo: "",
    mentor_cpf: "",
    mentor_foto: ""
  }

  id_cargo: any

  constructor(private funcService: FuncionariosService, private route: ActivatedRoute, private fb: FormBuilder, private location: Location, private mentorService: MentorService) {
    this.mentor.id_mentor = this.route.snapshot.paramMap.get('id_mentor')!
    this.id_cargo = this.route.snapshot.paramMap.get('id_cargo')!

    this.form = this.fb.group({
      mentor_nome: ["", Validators.required],
      mentor_cargo: ["", Validators.required],
      mentor_cpf: ["", Validators.required],
      mentor_foto: [""]
    })
  }

  ngOnInit(): void {
    this.buscarMentor()
  }

  buscarMentor() {
    this.mentorService.buscarUmMentor(this.mentor.id_mentor).subscribe((resultado) => {
      this.mentor = resultado;
    })
  }

  editarMentor() {
    if (this.id_cargo != 0) {
      this.mentorService.editarMentor(this.mentor, this.mentor.id_mentor, this.id_cargo).subscribe({
        complete: () => {
          this.funcService.mensagem("Mentor(a) editado(a) com sucesso!")
          this.location.back();
        },
        error: () => {
          this.funcService.mensagem("Erro ao editar mentor(a).")
          this.location.back();
        },
        next: () => console.log("Mentor(a) editado(a).")
      })
    } else {
      this.mentorService.editarMentorSemCargo(this.mentor, this.mentor.id_mentor).subscribe({
        complete: () => {
          this.funcService.mensagem("Mentor(a) editado(a) com sucesso!")
          this.location.back();
        },
        error: () => {
          this.funcService.mensagem("Erro ao editar mentor(a).")
          this.location.back();
        },
        next: () => console.log("Mentor(a) editado(a).")
      })
    }
  }


}
