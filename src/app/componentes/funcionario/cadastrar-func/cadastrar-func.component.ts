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

  form!: FormGroup
  cargoEscolhido: any
  id_cargo: string = ""
  cargos: any

  func: Funcionario = {
    func_nome: "",
    func_cidade: "",
  }

  constructor(private funcService: FuncionariosService, private route: ActivatedRoute, private router: Router, private fb: FormBuilder, private cargoService: CargosService, private location: Location) {
    this.id_cargo = this.route.snapshot.paramMap.get("id_cargo")!

    this.form = this.fb.group({
      func_nome: ["", Validators.required],
      func_cidade: ["", Validators.required]
    })
  }

  ngOnInit(): void {
    this.mostrarCargos()
  }

  cadastrarFunc() {
    this.funcService.cadastrarFunc(this.func).subscribe({
      complete: () => {
        this.funcService.mensagem("Funcionário cadastrado com sucesso!")
        this.location.back()
      },
      error: () => {
        this.funcService.mensagem("Não foi possível cadastrar o funcionário.")
        this.location.back()
      },
      next: () => console.log("Funcionario cadastrado")
    })
  }

  mostrarCargos(){
    this.cargoService.mostrarTodos().subscribe(resultado =>{
      this.cargos = resultado
    })
  }

  escolherTurma(){
    console.log(this.cargoEscolhido)
  }

}
