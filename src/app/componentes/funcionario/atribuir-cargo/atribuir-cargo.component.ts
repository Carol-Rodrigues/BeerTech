import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { FuncionariosService } from './../../../services/funcionarios.service';
import { Funcionario } from './../../../models/funcionariosModel';
import { Cargo } from './../../../models/cargosModel';
import { Component, OnInit } from '@angular/core';
import { CargosService } from 'src/app/services/cargos.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-atribuir-cargo',
  templateUrl: './atribuir-cargo.component.html',
  styleUrls: ['./atribuir-cargo.component.scss']
})
export class AtribuirCargoComponent implements OnInit {

  cargos: Cargo[] = []
  cargoEscolhido: any = []
  id_cargo: any
  id_funcionario: any
  cargoDoFunc: any = []

  funcionario: Funcionario = {
    func_nome: '',
    func_cidade: ''
  }

  closeResult = '';

  constructor(private cargoService: CargosService,
    private funcService: FuncionariosService,
    private route: ActivatedRoute,
    private router: Router, private modalService: NgbModal, private location: Location) { }

  ngOnInit(): void {
    this.id_funcionario = this.route.snapshot.paramMap.get('id_funcionario')
    this.id_cargo = this.route.snapshot.paramMap.get('id_cargo')
    console.log(this.id_cargo)
    this.buscarTodosCargos()
    this.mostrarFuncionario()
    this.buscarCargo()
  }

  buscarTodosCargos() {
    this.cargoService.mostrarTodos().subscribe(resultado => {
      this.cargos = resultado
    })
  }

  mostrarCargo() {
    console.log(this.cargoEscolhido)
  }

  mostrarFuncionario() {
    this.funcService.buscarUmFunc(this.id_funcionario).subscribe(resultado => {
      this.funcionario = resultado
    })
  }

  buscarCargo() {
    this.cargoService.mostrarCargo(this.id_cargo).subscribe(resultado => {
      this.cargoEscolhido = resultado
      console.log(this.cargoDoFunc)
    })
  }

  atribuirCargo() {
    this.funcService.atribuirCargo(this.cargoEscolhido, this.id_funcionario).subscribe({
      complete: () => {
        this.cargoService.mensagem("Cargo atribuído com sucesso.")
        this.location.back()
      },
      error: () => {
        this.cargoService.mensagem("Erro ao atribuir cargo.")
        this.location.back()
      },
      next: () => { console.log("Cargo atribuído.") }

    });
  }

  deixarFuncionarioSemCargo() {
    this.funcService.deixarFuncSemCargo(this.funcionario, this.id_funcionario).subscribe({
      complete: () => {
        this.cargoService.mensagem("Cargo desvinculado com sucesso.")
        this.location.back()
      },
      error: () => {
        this.cargoService.mensagem("Erro: o cargo não foi retirado do(a) funcionário(a).")
        this.location.back()
      },
      next: () => { console.log("Funcionario editado com sucesso") }

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
