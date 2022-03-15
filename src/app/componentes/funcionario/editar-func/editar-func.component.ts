import { HttpClient } from '@angular/common/http';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FuncionariosService } from '../../../services/funcionarios.service';
import { Funcionario } from '../../../models/funcionariosModel';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-editar-func',
  templateUrl: './editar-func.component.html',
  styleUrls: ['./editar-func.component.scss']
})
export class EditarFuncComponent implements OnInit {

  form!: FormGroup

  closeResult = '';

  func: Funcionario = {
    func_nome: "",
    func_cidade: "",
    func_cpf: "",
    func_foto: ""
  }

  foto !: any

  id_cargo: any = "";

  showDiv = {
    opcaonao: false,
    atualizar: true
  }

  constructor(private funcService: FuncionariosService, private router: Router, private route: ActivatedRoute, private fb: FormBuilder, private location: Location, private http: HttpClient, private modalService: NgbModal) {
    this.func.id_funcionario = this.route.snapshot.paramMap.get('id_funcionario')!
    this.id_cargo = this.route.snapshot.paramMap.get('id_cargo')!

    this.form = this.fb.group({
      func_nome: ["", Validators.required],
      func_cidade: ["", Validators.required],
      func_cpf: ["", Validators.required],
      func_foto: [""]
    })
  }

  ngOnInit(): void {
    this.buscarFunc()
  }

  buscarFunc() {
    this.funcService.buscarUmFunc(this.func.id_funcionario).subscribe((resultado) => {
      this.func = resultado;
    })
  }

  editarFunc() {
    if (this.id_cargo != 0) {
      this.funcService.editarFunc(this.func, this.func.id_funcionario, this.id_cargo).subscribe({
        complete: () => {
          this.funcService.mensagem("Funcionárix editadx com sucesso!")
          // this.location.back();
        },
        error: () => {
          this.funcService.mensagem("Erro ao editar funcionárix.")
          // this.location.back();
        },
        next: () => console.log("Funcionárix editadx.")
      })
    } else {
      this.funcService.editarFuncSemCargo(this.func, this.func.id_funcionario).subscribe({
        complete: () => {
          this.funcService.mensagem("Funcionárix editadx com sucesso!")
          // this.location.back();
        },
        error: () => {
          this.funcService.mensagem("Erro ao editar funcionárix.")
          // this.location.back();
        },
        next: () => console.log("Funcionárix editadx.")
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

      const cpf: string = this.func.func_cpf + "-" + event.target.files[0].name

      this.http.post(`http://localhost:8080/empresa/enviar/${this.func.id_funcionario}?cpf=${cpf}`, formData).subscribe({
        complete: () => console.log("Foto enviada com sucesso."),
      })
      this.funcService.mensagem("Imagem anexada ax funcionárix")
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
