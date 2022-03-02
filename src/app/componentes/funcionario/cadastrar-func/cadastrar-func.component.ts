import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FuncionariosService } from '../../../services/funcionarios.service';
import { Funcionario } from '../../../models/funcionariosModel';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cadastrar-func',
  templateUrl: './cadastrar-func.component.html',
  styleUrls: ['./cadastrar-func.component.scss']
})
export class CadastrarFuncComponent implements OnInit {

  form!: FormGroup

  id_cargo: string = ""

  func: Funcionario = {
    func_nome: "",
    func_cidade: "",
  }

  constructor(private funcService: FuncionariosService, private route: ActivatedRoute, private router: Router, private fb: FormBuilder) {
    this.id_cargo = this.route.snapshot.paramMap.get("id_cargo")!

    this.form = this.fb.group({
      func_nome: ["", Validators.required],
      func_cidade: ["", Validators.required]
    })
  }

  ngOnInit(): void {
  }

  cadastrarFunc() {
    this.funcService.cadastrarFunc(this.func, this.id_cargo).subscribe({
      complete: () => {
        this.funcService.mensagem("Funcionário cadastrado com sucesso!")
        this.router.navigate([`funcCargo/${this.id_cargo}`])
      },
      error: () => {
        this.funcService.mensagem("Não foi possível cadastrar o funcionário.")
        this.router.navigate([`funcCargo/${this.id_cargo}`])
      },
      next: () => console.log("Funcionario cadastrado")
    })
  }

}
