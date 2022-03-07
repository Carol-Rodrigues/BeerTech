import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cargo } from '../../../models/cargosModel';
import { CargosService } from '../../../services/cargos.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editar-cargos',
  templateUrl: './editar-cargos.component.html',
  styleUrls: ['./editar-cargos.component.scss']
})
export class EditarCargosComponent implements OnInit {

  form!: FormGroup

  cargo: Cargo = {
    car_nome: "",
    car_atribuicao: ""
  }

  constructor(private cargoService: CargosService, private route: ActivatedRoute, private router: Router, private fb: FormBuilder) {
    this.form = this.fb.group({
      car_nome: ["", Validators.required],
      car_atribuicao: ["", Validators.required]
    })
  }

  ngOnInit(): void {
    this.cargo.id_cargo = this.route.snapshot.paramMap.get('id_cargo')
    this.mostrarUmaTurma()
  }

  mostrarUmaTurma() {
    this.cargoService.mostrarCargo(this.cargo.id_cargo).subscribe((resultado) => {
      this.cargo = resultado;
    })
  }

  editarCargo() {
    this.cargoService.editarCargo(this.cargo).subscribe({
      complete: () => {
        this.cargoService.mensagem("Cargo editado com sucesso!")
        this.router.navigate([`/cargo`])
      },
      error: () => {
        this.cargoService.mensagem("Erro ao editar o cargo.")
        this.router.navigate([`/cargo`])
      },
      next: () => console.log("Cargo editado")
    })
  }

}
