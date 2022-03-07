import { ActivatedRoute, Router } from '@angular/router';
import { Funcionario } from './../../../models/funcionariosModel';
import { Component, OnInit } from '@angular/core';
import { FuncionariosService } from 'src/app/services/funcionarios.service';

@Component({
  selector: 'app-lista-func-cargo',
  templateUrl: './lista-func-cargo.component.html',
  styleUrls: ['./lista-func-cargo.component.scss']
})
export class ListaFuncCargoComponent implements OnInit {

  id_cargo: any

  funcionarios: Funcionario[] = []

  constructor(private funcionarioService: FuncionariosService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {

    this.id_cargo = this.route.snapshot.paramMap.get('id_cargo')
    this.mostrarFuncionariosDoCargo()
  }

  mostrarFuncionariosDoCargo() {
    this.funcionarioService.buscarFuncCargos(this.id_cargo).subscribe(resultado => {
      this.funcionarios = resultado
      console.log(this.funcionarios)
    })
  }

}
