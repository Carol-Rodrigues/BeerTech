import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CargosService } from './../../../services/cargos.service';
import { Router } from '@angular/router';
import { MentorService } from './../../../services/mentor.service';
import { Mentor } from './../../../models/mentorModel';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-cadastrar-mentor',
  templateUrl: './cadastrar-mentor.component.html',
  styleUrls: ['./cadastrar-mentor.component.scss']
})
export class CadastrarMentorComponent implements OnInit {

  idMentorCadastrado: any
  mentorCadastrado: boolean = false

  form !: FormGroup

  mentor: Mentor = {
    mentor_nome: "",
    mentor_cargo: "",
    mentor_cpf: "",
    mentor_foto: ""
  }

  foto !: any

  constructor(private mentorService: MentorService, private cargoService: CargosService, private fb: FormBuilder, private http: HttpClient, private location: Location) {
    this.form = this.fb.group({
      mentor_nome: ["", Validators.required],
      mentor_cpf: ["", Validators.required],
      mentor_cargo: ["", Validators.required]
    })
  }

  ngOnInit(): void {
  }

  cadastrarMentor() {
    this.mentorService.cadastrarMentor(this.mentor).subscribe({
      complete: () => {
        this.cargoService.mensagem("Mentorx cadastradx com sucesso")
        this.mentorService.buscarMentorPeloCpf(`${this.mentor.mentor_cpf}`).subscribe((res) => {
          console.log(res)
          this.idMentorCadastrado = res.id_mentor
          this.mentorCadastrado = true
        })
        // this.location.back() Não redireciona pq precisamos cadastrar foto ainda
      },
      error: () => {
        this.cargoService.mensagem("Erro ao cadastrar mentorx")
        // this.location.back() Não redireciona pq precisamos cadastrar foto ainda
      },
      next: () => { console.log("Mentorx cadastradx.") }

    });
  }

  importarImg(event: any) {

    // Se o usuário selecionar um arquivo e
    // Se estiver na posição 0 (o multifiles permite que sejam importados diversos arquivos, que serão registrados em array)
    if(event.target.files && event.target.files[0]) {
      this.foto = event.target.files[0]

      console.log(this.foto)

      // variável que aramazena os seguintes atributos -- nome do atributo: , valor do atributo:
      // é como se estivessemos criando um obj
      const formData = new FormData

      // dentro do formData, criamos um atributo que chama foto e atribuímos a ele o conteúdo da variável foto
      formData.append("foto", this.foto)

      const cpf: string = this.mentor.mentor_cpf + "-" + event.target.files[0].name

      this.http.post(`http://localhost:8080/empresa/envio/${this.idMentorCadastrado}?cpf=${cpf}`, formData).subscribe({
        complete: () => console.log("Foto enviada com sucesso."),
      })
      this.cargoService.mensagem("Imagem anexada ax mentorx")
      this.location.back();
    }
  }

}
