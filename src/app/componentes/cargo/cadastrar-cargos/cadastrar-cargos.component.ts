import { Cargo } from '../../../models/cargosModel';
import { Router } from '@angular/router';
import { CargosService } from '../../../services/cargos.service';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-cadastrar-cargos',
  templateUrl: './cadastrar-cargos.component.html',
  styleUrls: ['./cadastrar-cargos.component.scss']
})
export class CadastrarCargosComponent implements OnInit {

  form!: FormGroup

  cargo: Cargo = {
    car_nome: "",
    car_atribuicao: ""
  }

  constructor(private cargoService: CargosService, private router: Router, private fb: FormBuilder) {
    this.form = this.fb.group({
      car_nome: ["", Validators.required],
      car_atribuicao: ["", Validators.required]
    })
  }

  ngOnInit(): void {
  }

  cadastrarCargo() {
    this.cargoService.cadastrar(this.cargo).subscribe((resultado) => {
      // alert("Cargo cadastrado com sucesso!")
      this.cargoService.mensagem("Cargo cadastrado com sucesso!")
      this.router.navigate(["/cargos"])
    })
  }

}
