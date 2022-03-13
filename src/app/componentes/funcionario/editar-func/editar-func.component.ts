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

  func: Funcionario = {
    func_nome: "",
    func_cidade: "",
    func_cpf: "",
    func_foto: ""
  }

  id_cargo: any = "";

  constructor(private funcService: FuncionariosService, private router: Router, private route: ActivatedRoute, private fb: FormBuilder, private location: Location) {
    this.func.id_funcionario = this.route.snapshot.paramMap.get('id_funcionario')!
    this.id_cargo = this.route.snapshot.paramMap.get('id_cargo')!

    this.form = this.fb.group({
      func_nome: ["", Validators.required],
      func_cidade: ["", Validators.required],
      func_cpf: ["", Validators.required]
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
          this.funcService.mensagem("Funcionário editado com sucesso!")
          this.location.back();
        },
        error: () => {
          this.funcService.mensagem("Erro ao editar funcionário.")
          this.location.back();
        },
        next: () => console.log("Funcionário editado.")
      })
    } else {
      this.funcService.editarFuncSemCargo(this.func, this.func.id_funcionario).subscribe({
        complete: () => {
          this.funcService.mensagem("Funcionário editado com sucesso!")
          this.location.back();
        },
        error: () => {
          this.funcService.mensagem("Erro ao editar funcionário.")
          this.location.back();
        },
        next: () => console.log("Funcionário editado.")
      })
    }
  }

  // trocarCargo() {
  //   this.id_cargo = prompt("O funcionário será transferido para qual cargo?", "id_cargo")
  //   this.funcService.editarFunc(this.func, this.func.id_funcionario, this.id_cargo).subscribe({
  //     complete: () => {
  //       this.funcService.mensagem("Funcionário transferido com sucesso!")
  //       this.router.navigate([`funcCargo/${this.id_cargo}`])
  //     },
  //     error: () => {
  //       this.funcService.mensagem("Erro ao transferir funcionário.")
  //     },
  //     next: () => console.log("Funcionário transferido.")
  //   })
  // }
}
