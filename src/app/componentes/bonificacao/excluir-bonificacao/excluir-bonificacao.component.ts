import { CargosService } from './../../../services/cargos.service';
import { BonificacaoService } from './../../../services/bonificacao.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Bonificacao } from './../../../models/bonificacaoModel';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-excluir-bonificacao',
  templateUrl: './excluir-bonificacao.component.html',
  styleUrls: ['./excluir-bonificacao.component.scss']
})
export class ExcluirBonificacaoComponent implements OnInit {

  form!: FormGroup

  closeResult = '';

  bonificacao: Bonificacao = {
    bo_descricao: "",
    bo_dataPagamento: "",
    bo_valor: "",
    bo_status: ""
  }

  id_mentor: any

  constructor(private modalService: NgbModal, private location: Location, private route: ActivatedRoute, private bonificacaoService: BonificacaoService, private cargoService: CargosService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.bonificacao.codigo = this.route.snapshot.paramMap.get('codigo')
    this.id_mentor = this.route.snapshot.paramMap.get('id_mentor')
    this.buscarUmaBonificacao()

    this.form = this.fb.group({
      bo_descricao: ["", Validators.required],
      bo_dataPagamento: ["", Validators.required],
      bo_valor: ["", Validators.required],
      bo_status: ["", Validators.required],
    })
  }

  buscarUmaBonificacao() {
    this.bonificacaoService.buscarUmaBonificacao(this.bonificacao.codigo).subscribe((resultado) => {
      this.bonificacao.bo_dataPagamento = resultado.bo_dataPagamento.slice(0,10) //Para pegarmos apenas a data, sem o UTC
      this.bonificacao = resultado
    })
  }

  excluirBonificacao() {
    this.bonificacaoService.excluirBonificacao(this.bonificacao.codigo, this.id_mentor).subscribe({
      complete: () => {
        this.cargoService.mensagem("Bonificação excluída com sucesso.")
        this.location.back()
      },
      error: () => {
        this.cargoService.mensagem("Erro ao excluir bonificação.")
        this.location.back()
      },
      next: () => { console.log("Bonificação excluída.") }
    });
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
