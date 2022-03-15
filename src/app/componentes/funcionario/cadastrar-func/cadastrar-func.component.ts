import { HttpClient } from '@angular/common/http';
import { CargosService } from './../../../services/cargos.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FuncionariosService } from '../../../services/funcionarios.service';
import { Funcionario } from '../../../models/funcionariosModel';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-cadastrar-func',
  templateUrl: './cadastrar-func.component.html',
  styleUrls: ['./cadastrar-func.component.scss']
})
export class CadastrarFuncComponent implements OnInit {

  idFuncCadastrado: any
  funcCadastrado: boolean = false
  foto !: any

  form!: FormGroup
  cargoEscolhido: any
  id_cargo: string = ""
  cargos: any

  func: Funcionario = {
    func_nome: "",
    func_cidade: "",
    func_cpf: "",
    func_foto: ""
  }

  constructor(private funcService: FuncionariosService, private route: ActivatedRoute, private router: Router, private fb: FormBuilder, private cargoService: CargosService, private location: Location, private http: HttpClient) {
    this.id_cargo = this.route.snapshot.paramMap.get("id_cargo")!

    this.form = this.fb.group({
      func_nome: ["", Validators.required],
      func_cidade: ["", Validators.required],
      func_cpf: ["", Validators.required],
    })
  }

  ngOnInit(): void {
    this.mostrarCargos()
  }

  cadastrarFunc() {
    this.funcService.cadastrarFunc(this.func).subscribe({
      complete: () => {
        this.funcService.mensagem("Funcionárix cadastradx com sucesso!")
        // this.location.back() Não redireciona pq precisamos cadastrar foto ainda

        this.funcService.buscarFuncPeloCpf(`${this.func.func_cpf}`).subscribe((res) => {
          console.log(res)
          this.idFuncCadastrado = res.id_funcionario
          this.funcCadastrado = true
        })
      },
      error: () => {
        this.funcService.mensagem("Não foi possível cadastrar.")
        // this.location.back() Não redireciona pq precisamos cadastrar foto ainda
      },
      next: () => console.log("Funcionarix cadastradx")
    })
  }

  mostrarCargos(){
    this.cargoService.mostrarTodos().subscribe(resultado =>{
      this.cargos = resultado
    })
  }

  escolherCargo(){
    console.log(this.cargoEscolhido)
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

      const cpf: string = this.func.func_cpf + "-" + event.target.files[0].name

      this.http.post(`http://localhost:8080/empresa/enviar/${this.idFuncCadastrado}?cpf=${cpf}`, formData).subscribe({
        complete: () => console.log("Foto enviada com sucesso."),
      })
      this.cargoService.mensagem("Imagem anexada ax funcionárix")
      this.location.back();
    }
  }

}
