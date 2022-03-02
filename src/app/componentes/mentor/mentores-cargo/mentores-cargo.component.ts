import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CargosService } from './../../../services/cargos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MentorService } from './../../../services/mentor.service';
import { Cargo } from './../../../models/cargosModel';
import { Mentor } from './../../../models/mentorModel';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mentores-cargo',
  templateUrl: './mentores-cargo.component.html',
  styleUrls: ['./mentores-cargo.component.scss']
})
export class MentoresCargoComponent implements OnInit {

  form!: FormGroup

  mentor: Mentor = {
    mentor_nome: "",
    mentor_cargo: "",
    mentor_foto: ""
  }

  cargo: Cargo = {
    car_nome: "",
    car_atribuicao: ""
  }

  mentorCadastrado: boolean = false

  id_cargo: any
  mentoresSemCargo: any
  mentorSemCargo: any = []

  constructor(private mentorService: MentorService, private route: ActivatedRoute, private router: Router, private cargoService: CargosService, private fb: FormBuilder) {
    this.id_cargo = this.route.snapshot.paramMap.get("id_cargo")

    this.form = this.fb.group({
      mentor_nome: ["", Validators.required],
      mentor_cargo: ["", Validators.required],
      mentor_foto: [""]
    })
  }

  ngOnInit(): void {
    this.buscarMentorDoCargo()
    this.buscarMentorSemCargo()
  }

  buscarMentorDoCargo() {
    this.mentorService.buscarMentorCargo(this.id_cargo).subscribe((resultado) => {

      if(resultado == undefined) {
        this.cargoService.mensagem("Para esse cargo não há mentor definido.")
        this.mentorCadastrado = false
      } else {
        this.mentor = resultado
        this.mentorCadastrado = true
      }
    })
  }

  buscarMentorSemCargo() {
    this.mentorService.buscarMentorSemCargo().subscribe((resultado) => {
      this.mentoresSemCargo = resultado
      console.log(this.mentoresSemCargo)
    })
  }

  mostrarMentor() {
    console.log(this.mentorSemCargo)
    this.mentor = this.mentorSemCargo
  }

  atribuirMentor() {
    this.cargoService.mostrarCargo(this.id_cargo).subscribe((res) => {
      this.cargo = res
    })

    this.cargoService.atribuirMentor(this.cargo, this.id_cargo, this.mentor.id_mentor).subscribe({
      complete: () => {
        this.cargoService.mensagem("Mentor atribuído com sucesso.")
      },
      error: () => {
        this.cargoService.mensagem("Erro ao atribuir mentor.")
      },
      next: () => console.log("Mentor atribuído")
    })
  }

}
