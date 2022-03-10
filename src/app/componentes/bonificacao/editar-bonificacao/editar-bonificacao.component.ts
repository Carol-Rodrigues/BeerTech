import { CargosService } from './../../../services/cargos.service';
import { ActivatedRoute } from '@angular/router';
import { BonificacaoService } from './../../../services/bonificacao.service';
import { Bonificacao } from './../../../models/bonificacaoModel';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';


@Component({
  selector: 'app-editar-bonificacao',
  templateUrl: './editar-bonificacao.component.html',
  styleUrls: ['./editar-bonificacao.component.scss']
})
export class EditarBonificacaoComponent implements OnInit {

  form!: FormGroup

  closeResult = '';

  bonificacao: Bonificacao = {
    bo_descricao: "",
    bo_dataPagamento: "",
    bo_valor: "",
    bo_status: ""
  }

  id_mentor: any

  constructor(private bonificacaoService: BonificacaoService,
              private route: ActivatedRoute,
              private location: Location,
              private fb: FormBuilder,
              private cargoService: CargosService) { }

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

  buscarUmaBonificacao(){
    this.bonificacaoService.buscarUmaBonificacao(this.bonificacao.codigo).subscribe((resultado)=>{
      this.bonificacao = resultado
      this.bonificacao.bo_dataPagamento = resultado.bo_dataPagamento.slice(0,10) //Para pegarmos apenas a data, sem o UTC
      console.log(this.bonificacao.bo_dataPagamento)
    })
  }

  editarBonificacao(){
    this.bonificacaoService.editarBonificacao(this.bonificacao, this.bonificacao.codigo, this.id_mentor).subscribe({
    complete: () => { this.cargoService.mensagem("Bonificação editada com sucesso.")
                      this.location.back()},
    error: () => { this.cargoService.mensagem("Erro ao editar bonificação.")
                      this.location.back() },
    next: () => { console.log("Bonificacao editada.")}

    });

  }
}
