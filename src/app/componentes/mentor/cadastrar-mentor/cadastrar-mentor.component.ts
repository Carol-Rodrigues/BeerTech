import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CargosService } from './../../../services/cargos.service';
import { Router } from '@angular/router';
import { MentorService } from './../../../services/mentor.service';
import { Mentor } from './../../../models/mentorModel';
import { Component, OnInit } from '@angular/core';

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
    mentor_foto: ""
  }

  foto !: any

  constructor(private mentorService: MentorService, private router: Router, private cargoService: CargosService, private fb: FormBuilder, private http: HttpClient) {
    this.form = this.fb.group({
      mentor_nome: ["", Validators.required],
      mentor_cargo: ["", Validators.required]
    })
  }

  ngOnInit(): void {
  }

  cadastrarMentor() {
    this.mentorService.cadastrarMentor(this.mentor).subscribe({
      complete: () => {
        this.cargoService.mensagem("Mentor cadastrado com sucesso")
        this.mentorService.buscarMentorPeloNome(`${this.mentor.mentor_nome}`).subscribe((res) => {
          console.log(res)
          this.idMentorCadastrado = res.id_mentor
          this.mentorCadastrado = true
        })
      },
      error: () => {
        this.cargoService.mensagem("Erro ao cadastrar o mentor")
      },
      next: () => { console.log("Mentor cadastrado.") }

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

      const nome: string = this.mentor.mentor_nome + "-" + event.target.files[0].name

      this.http.post(`http://localhost:8080/escola/envio/${this.idMentorCadastrado}?nome=${nome}`, formData).subscribe({
        complete: () => console.log("Foto enviada com sucesso.")
      })
    }
  }

}
