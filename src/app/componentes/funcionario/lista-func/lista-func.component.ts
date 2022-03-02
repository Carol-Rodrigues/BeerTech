import { FuncionariosService } from '../../../services/funcionarios.service';
import { ActivatedRoute } from '@angular/router';
import { Funcionario } from '../../../models/funcionariosModel';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-func',
  templateUrl: './lista-func.component.html',
  styleUrls: ['./lista-func.component.scss']
})
export class ListaFuncComponent implements OnInit {

  func: Funcionario[] = []

  // funcionario: Funcionario = {
  //   func_nome: "",
  //   func_cidade: ""
  // }

  id_cargo: string = ""

  constructor(private route: ActivatedRoute, private funcService: FuncionariosService) { }

  ngOnInit(): void {
    this.id_cargo = this.route.snapshot.paramMap.get("id_cargo")!
    this.buscarFuncCargos()
  }

  buscarFuncCargos() {
    this.funcService.buscarFuncCargos(this.id_cargo).subscribe((resultado) => {
      this.func = resultado;
    })
  }

}
