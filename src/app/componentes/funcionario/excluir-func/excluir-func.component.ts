import { Funcionario } from '../../../models/funcionariosModel';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { FuncionariosService } from 'src/app/services/funcionarios.service';

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
    func_cidade: ""
  }

  id_cargo: String = ""

  constructor(private funcService: FuncionariosService,
    private route: ActivatedRoute, private router: Router, private fb: FormBuilder, public dialog: MatDialog, private modalService: NgbModal) {

    this.func.id_funcionario = this.route.snapshot.paramMap.get("id_funcionario");

    this.form = this.fb.group({
      func_nome: ["", Validators.required],
      func_cidade: ["", Validators.required]
    })
  }

  ngOnInit(): void {
    this.buscarUmFunc();
    this.buscarIdCargo();
  }

  buscarUmFunc(){
    this.funcService.buscarUmFunc(this.func.id_funcionario).subscribe((resultado)=>{
      console.log(resultado);
      this.func = resultado;
    })
  }

  buscarIdCargo() {
    this.funcService.buscarIdCargo(this.func.id_funcionario).subscribe((resultado) => {
      this.id_cargo = resultado;
    })
  }

  excluirFunc() {
    this.funcService.excluirFunc(this.func.id_funcionario).subscribe({
      complete: () => {
        this.funcService.mensagem("Funcionário(a) excluído(a) com sucesso!")
        this.router.navigate([`funcCargo/${this.id_cargo}`])
      },
      error: () => {
        this.funcService.mensagem("Erro ao excluir funcionário(a).")
        this.router.navigate([`funcCargo/${this.id_cargo}`])
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