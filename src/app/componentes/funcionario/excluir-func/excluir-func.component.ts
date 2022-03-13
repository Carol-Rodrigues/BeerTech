import { Funcionario } from '../../../models/funcionariosModel';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { FuncionariosService } from 'src/app/services/funcionarios.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-excluir-func',
  templateUrl: './excluir-func.component.html',
  styleUrls: ['./excluir-func.component.scss']
})
export class ExcluirFuncComponent implements OnInit {

  form!: FormGroup

  closeResult = '';

  func: Funcionario = {
    func_nome: "",
    func_cidade: "",
    func_cpf: "",
    func_foto: ""
  }

  id_cargo: String = ""

  constructor(private funcService: FuncionariosService,
    private route: ActivatedRoute, private router: Router, private fb: FormBuilder, private modalService: NgbModal, private location: Location) {

    this.func.id_funcionario = this.route.snapshot.paramMap.get("id_funcionario");

    this.form = this.fb.group({
      func_nome: ["", Validators.required],
      func_cidade: ["", Validators.required],
      func_cpf: ["", Validators.required],
      func_foto:[""]
    })
  }

  ngOnInit(): void {
    this.buscarUmFunc();
    // this.buscarIdCargo();
  }

  buscarUmFunc(){
    this.funcService.buscarUmFunc(this.func.id_funcionario).subscribe((resultado)=>{
      // console.log(resultado);
      this.func = resultado;
      this.func.func_foto = resultado.func_foto.slice(11,100)
    })
  }

  // buscarIdCargo() {
  //   this.funcService.buscarIdCargo(this.func.id_funcionario).subscribe((resultado) => {
  //     this.id_cargo = resultado;
  //   })
  // }

  excluirFunc() {
    this.funcService.excluirFunc(this.func.id_funcionario).subscribe({
      complete: () => {
        this.funcService.mensagem("Funcionário(a) excluído(a) com sucesso!")
        this.location.back();
      },
      error: () => {
        this.funcService.mensagem("Erro ao excluir funcionário(a).")
        this.location.back();
      },
      next: () => console.log("Funcionário(a) excluído(a)")
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
