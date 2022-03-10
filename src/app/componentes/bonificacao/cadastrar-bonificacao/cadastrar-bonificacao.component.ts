import { CargosService } from './../../../services/cargos.service';
import { Bonificacao } from './../../../models/bonificacaoModel';
import { ActivatedRoute } from '@angular/router';
import { BonificacaoService } from './../../../services/bonificacao.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-cadastrar-bonificacao',
  templateUrl: './cadastrar-bonificacao.component.html',
  styleUrls: ['./cadastrar-bonificacao.component.scss']
})
export class CadastrarBonificacaoComponent implements OnInit {

  form!: FormGroup

  bonificacao: Bonificacao ={
    bo_descricao: '',
    bo_dataPagamento:'',
    bo_valor:0,
    bo_status:'PENDENTE'
  }

  id_mentor: any

  constructor(private fb: FormBuilder, private bonificacaoService: BonificacaoService, private route: ActivatedRoute, private location: Location, private cargoService: CargosService) {
    this.id_mentor = this.route.snapshot.paramMap.get('id_mentor')!
  }

  ngOnInit(): void {

    this.form = this.fb.group({
      bo_descricao: ["", Validators.required],
      bo_dataPagamento: ["", Validators.required],
      bo_valor: ["", Validators.required],
      bo_status: ["", Validators.required],
    })
  }

  cadastrarBonificacao(){
    this.bonificacaoService.cadastrarBonificacao(this.bonificacao, this.id_mentor).subscribe({
    complete: () => { this.cargoService.mensagem("Bonificação cadastrada com sucesso.")
                      this.location.back()},
    error: () => { this.cargoService.mensagem("Erro ao cadastrar bonificação.")
                    this.location.back()},
    next: () => { console.log("Bonificação cadastrada.")}
    });

  }

}
