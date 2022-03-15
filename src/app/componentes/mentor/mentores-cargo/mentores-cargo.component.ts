import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CargosService } from './../../../services/cargos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MentorService } from './../../../services/mentor.service';
import { Cargo } from './../../../models/cargosModel';
import { Mentor } from './../../../models/mentorModel';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

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
    mentor_cpf: "",
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

  closeResult = '';

  constructor(private mentorService: MentorService, private route: ActivatedRoute, private router: Router, private cargoService: CargosService, private fb: FormBuilder, private modalService: NgbModal, private location: Location) {
    this.id_cargo = this.route.snapshot.paramMap.get("id_cargo")

    this.form = this.fb.group({
      mentor_nome: ["", Validators.required],
      mentor_cpf: ["", Validators.required],
      mentor_cargo: ["", Validators.required],
      mentor_foto: [""]
    })
  }

  ngOnInit(): void {
    this.buscarCargo()
    this.buscarMentorDoCargo()
    this.buscarMentorSemCargo()
  }

  buscarCargo() {
    this.cargoService.mostrarCargo(this.id_cargo).subscribe(resultado => {
      this.cargo = resultado
    })
  }

  buscarMentorDoCargo() {
    this.mentorService.buscarMentorCargo(this.id_cargo).subscribe((resultado) => {

      if (resultado == undefined) {
        this.cargoService.mensagem("Para esse cargo não há mentorx definidx.")
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
        this.cargoService.mensagem("Mentorx atribuídx com sucesso.")
        this.location.back()
      },
      error: () => {
        this.cargoService.mensagem("Erro ao atribuir mentorx.")
        this.location.back()
      },
      next: () => console.log("Mentorx atribuídx")
    })
  }

  deixarCargoSemMentor() {
    this.cargoService.deixarCargoSemMentor(this.cargo, this.id_cargo, this.mentor.id_mentor).subscribe({
      complete: () => {
        this.cargoService.mensagem("Mentorx desvinculadx com sucesso.")
        this.location.back()
      },
      error: () => {
        this.cargoService.mensagem("Erro: mentorx não foi retiradx do cargo.")
        this.location.back()
      }
    })
  }

  // Função para abrir modal
  open(content: any) {
    //formato do modal
    this.modalService.open(content, { size: 'md' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  } //open

  // Função para fechar modal
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  } //getDismissReason
}
