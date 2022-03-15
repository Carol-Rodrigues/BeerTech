import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
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

  closeResult = '';

  mentor: Mentor = {
    mentor_nome: "",
    mentor_cargo: "",
    mentor_cpf: "",
    mentor_foto: ""
  }

  foto !: any

  id_cargo: any

  showDiv = {
    opcaonao: false,
    atualizar: true
  }

  constructor(private funcService: FuncionariosService, private route: ActivatedRoute, private fb: FormBuilder, private location: Location, private mentorService: MentorService, private http: HttpClient, private modalService: NgbModal) {
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
          this.funcService.mensagem("Mentorx editadx com sucesso!")
          // this.location.back();
        },
        error: () => {
          this.funcService.mensagem("Erro ao editar mentorx.")
          // this.location.back();
        },
        next: () => console.log("Mentorx editadx.")
      })
    } else {
      this.mentorService.editarMentorSemCargo(this.mentor, this.mentor.id_mentor).subscribe({
        complete: () => {
          this.funcService.mensagem("Mentorx editadx com sucesso!")
          // this.location.back();
        },
        error: () => {
          this.funcService.mensagem("Erro ao editar mentorx.")
          // this.location.back();
        },
        next: () => console.log("Mentorx editadx.")
      })
    }
  }

  importarImg(event: any) {

    // Se o usuário selecionar um arquivo e
    // Se estiver na posição 0 (o multifiles permite que sejam importados diversos arquivos, que serão registrados em array)
    if (event.target.files && event.target.files[0]) {
      this.foto = event.target.files[0]

      console.log(this.foto)

      // variável que aramazena os seguintes atributos -- nome do atributo: , valor do atributo:
      // é como se estivessemos criando um obj
      const formData = new FormData

      // dentro do formData, criamos um atributo que chama foto e atribuímos a ele o conteúdo da variável foto
      formData.append("foto", this.foto)

      const cpf: string = this.mentor.mentor_cpf + "-" + event.target.files[0].name

      this.http.post(`http://localhost:8080/empresa/envio/${this.mentor.id_mentor}?cpf=${cpf}`, formData).subscribe({
        complete: () => console.log("Foto enviada com sucesso."),
      })
      this.funcService.mensagem("Imagem anexada ax mentorx")
      // window.location.reload()
    }
  }

  atualizarPg() {
    window.location.reload();
  }

  voltar() {
    this.location.back()
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
