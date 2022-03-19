import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { MentorService } from './../../../services/mentor.service';
import { Cargo } from './../../../models/cargosModel';
import { Mentor } from './../../../models/mentorModel';
import { Component, OnInit } from '@angular/core';
import { CargosService } from 'src/app/services/cargos.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-atribuir-cargo-mentor',
  templateUrl: './atribuir-cargo-mentor.component.html',
  styleUrls: ['./atribuir-cargo-mentor.component.scss']
})
export class AtribuirCargoMentorComponent implements OnInit {

  closeResult = '';

  id_mentor: any

  cargosSemMentor: any
  cargoSemMentorEscolhido: any = []
  mentorSemCargoEscolhido: any = []

  mentor: Mentor = {
    id_mentor: '',
    mentor_nome: '',
    mentor_cpf: '',
    mentor_cargo: '',
    mentor_foto: ''
  }

  cargo: Cargo = {
    id_cargo: '',
    car_nome: '',
    car_atribuicao: ''
  }

  constructor(private mentorService: MentorService,
    private route: ActivatedRoute,
    private router: Router,
    private cargoService: CargosService,
    private location: Location, private modalService: NgbModal) { }

  ngOnInit(): void {

    this.id_mentor = this.route.snapshot.paramMap.get('id_mentor')
    this.buscarMentor()
    this.buscarMentorDoCargo()
    this.buscarCargoSemMentor()
  }

  buscarMentor() {
    this.mentorService.buscarUmMentor(this.id_mentor).subscribe(resultado => {
      this.mentor = resultado
    })
  }

  buscarMentorDoCargo() {
    this.cargoService.buscarCargoDoMentor(this.id_mentor).subscribe(resultado => {

      if (resultado == null) {
        this.cargoService.mensagem("Para essx mentorx não está definido um cargo")
      } else {
        this.cargo = resultado
        console.log(resultado);
      }

    })
  }

  buscarCargoSemMentor() {
    this.cargoService.mostrarCargosSemMentor().subscribe((resultado) => {

      this.cargosSemMentor = resultado
      // console.log("aqui")
      console.log(resultado);

    })

  }

  escolherCargo() {
    console.log(this.cargoSemMentorEscolhido)
    this.cargo = this.cargoSemMentorEscolhido
  }

  atribuirCargo() {
    this.mentorService.buscarUmMentor(this.id_mentor).subscribe((resultado) => {
      this.mentor = resultado
    })

    this.cargoService.atribuirMentor(this.cargo, this.cargo.id_cargo, this.mentor.id_mentor).subscribe({
      complete: () => {
        this.cargoService.mensagem("O cargo foi atribuído ax mentorx")
        this.location.back()
      },
      error: () => {
        this.cargoService.mensagem("Erro: o cargo não foi atribuído.")
        this.location.back()
      }
    })
  }

  deixarCargoSemMentor() {
    this.cargoService.deixarCargoSemMentor(this.cargo, this.cargo.id_cargo, this.mentor.id_mentor).subscribe({
      complete: () => {
        this.cargoService.mensagem("Mentorx está sem Cargo")
        this.location.back()
      },
      error: () => {
        this.cargoService.mensagem("Erro: mentorx não foi retiradx do cargo")
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
