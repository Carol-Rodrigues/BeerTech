import { CargosService } from './../../../services/cargos.service';
import { MentorService } from './../../../services/mentor.service';
import { ActivatedRoute } from '@angular/router';
import { BonificacaoService } from './../../../services/bonificacao.service';
import { Bonificacao } from './../../../models/bonificacaoModel';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-bonificacao-mentor',
  templateUrl: './bonificacao-mentor.component.html',
  styleUrls: ['./bonificacao-mentor.component.scss']
})
export class BonificacaoMentorComponent implements OnInit {

  id_mentor: any
  nomeMentor: any

  bonificacoes: Bonificacao[] = []

  bonificacao: any

  constructor(private bonificacaoService: BonificacaoService, private route: ActivatedRoute, private location: Location, private mentorService: MentorService, private cargoService: CargosService) {
    this.id_mentor = this.route.snapshot.paramMap.get('id_mentor')
  }

  ngOnInit(): void {
    this.listarBonificacaos()
    this.buscarMentor()
  }

  listarBonificacaos() {
    this.bonificacaoService.listarBonificacaoDoMentor(this.id_mentor).subscribe((res) => {
      this.bonificacoes = res
    })
  }

  buscarMentor() {
    this.mentorService.buscarUmMentor(this.id_mentor).subscribe((res) => {
      this.nomeMentor = res.mentor_nome
    })
  }

  quitarBonificacao(bonificacao: Bonificacao, codigo: any) {
    this.bonificacaoService.pagarBonificacao(bonificacao, codigo).subscribe({
      complete: () => {
        this.cargoService.mensagem("Bonificação paga com sucesso.")
        this.listarBonificacaos()
      },
      error: () => {
        this.cargoService.mensagem("Erro ao pagar bonificação.")
        this.listarBonificacaos()
      },
      next: () => { console.log("Bonificação paga.") }
    });
  }

  cancelarBonificacao(bonificacao: Bonificacao, codigo: any) {
    this.bonificacaoService.cancelarBonificacao(bonificacao, codigo).subscribe({
      complete: () => {
        this.cargoService.mensagem("Bonificação cancelada com sucesso.")
        this.listarBonificacaos()
      },
      error: () => {
        this.cargoService.mensagem("Erro ao cancelar bonificação.")
        this.listarBonificacaos()
      },
      next: () => { console.log("Bonificação cancelada.") }
    });
  }

}
