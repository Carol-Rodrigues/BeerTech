import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FuncionariosService } from '../../../services/funcionarios.service';
import { Funcionario } from '../../../models/funcionariosModel';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editar-func',
  templateUrl: './editar-func.component.html',
  styleUrls: ['./editar-func.component.scss']
})
export class EditarFuncComponent implements OnInit {

  form!: FormGroup

  func: Funcionario = {
    func_nome: "",
    func_cidade: "",
  }

  id_cargo: any = ""

  constructor(private funcService: FuncionariosService, private router: Router, private route: ActivatedRoute, private fb: FormBuilder) {
    this.func.id_funcionario = this.route.snapshot.paramMap.get('id_funcionario')!
    this.id_cargo = this.route.snapshot.paramMap.get('id_cargo')!

    this.form = this.fb.group({
      func_nome: ["", Validators.required],
      func_cidade: ["", Validators.required]
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
    // console.log(this.func)
    // console.log(this.func.id_funcionario)
    // console.log(this.id_cargo)
    this.funcService.editarFunc(this.func, this.func.id_funcionario, this.id_cargo).subscribe({
      complete: () => {
        this.funcService.mensagem("Funcionário editado com sucesso!")
        this.router.navigate([`funcCargo/${this.id_cargo}`])
      },
      error: () => {
        this.funcService.mensagem("Erro ao editar funcionário.")
        this.router.navigate([`funcCargo/${this.id_cargo}`])
      },
      next: () => console.log("Funcionário editado.")
    })
  }

  trocarCargo() {
    this.id_cargo = prompt("O funcionário será transferido para qual cargo?", "id_cargo")
    this.funcService.editarFunc(this.func, this.func.id_funcionario, this.id_cargo).subscribe({
      complete: () => {
        this.funcService.mensagem("Funcionário transferido com sucesso!")
        this.router.navigate([`funcCargo/${this.id_cargo}`])
      },
      error: () => {
        this.funcService.mensagem("Erro ao transferir funcionário.")
      },
      next: () => console.log("Funcionário transferido.")
    })
  }
}
