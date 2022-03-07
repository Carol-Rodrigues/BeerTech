import { ActivatedRoute, Router } from '@angular/router';
import { MentorService } from './../../../services/mentor.service';
import { Cargo } from './../../../models/cargosModel';
import { Mentor } from './../../../models/mentorModel';
import { Component, OnInit } from '@angular/core';
import { CargosService } from 'src/app/services/cargos.service';

@Component({
  selector: 'app-atribuir-cargo-mentor',
  templateUrl: './atribuir-cargo-mentor.component.html',
  styleUrls: ['./atribuir-cargo-mentor.component.scss']
})
export class AtribuirCargoMentorComponent implements OnInit {

  id_mentor: any

  cargosSemMentor: any
  cargoSemMentorEscolhido: any = []
  mentorSemCargoEscolhido: any = []

  mentor: Mentor = {
    id_mentor: '',
    mentor_nome: '',
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
    private cargoService: CargosService) { }

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
        this.cargoService.mensagem("Para esse mentor não está definido um cargo")
      } else {
        this.cargo = resultado
        console.log(resultado);
      }

    })
  }

  buscarCargoSemMentor() {
    this.cargoService.mostrarCargosSemMentor().subscribe((resultado) => {

      this.cargosSemMentor = resultado
      console.log("aqui")
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
        this.cargoService.mensagem("O cargo foi atribuído ao mentor")
        this.router.navigate(['/mentores/listaMentor'])
      },
      error: () => {
        this.cargoService.mensagem("Erro: o cargo não foi atribuído.")
        this.router.navigate(['/mentores/listaMentor'])
      }
    })
  }

  deixarCargoSemMentor() {
    this.cargoService.deixarCargoSemMentor(this.cargo, this.cargo.id_cargo, this.mentor.id_mentor).subscribe({
      complete: () => {
        this.cargoService.mensagem("O mentor está sem Cargo")
      },
      error: () => {
        this.cargoService.mensagem("Erro: o mentor não foi retirado do cargo")
      }
    })
  }


}
