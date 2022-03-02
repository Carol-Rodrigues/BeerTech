import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Cargo } from '../../../models/cargosModel';
import { CargosService } from '../../../services/cargos.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-excluir-cargos',
  templateUrl: './excluir-cargos.component.html',
  styleUrls: ['./excluir-cargos.component.scss']
})
export class ExcluirCargosComponent implements OnInit {

  form!: FormGroup

  cargo: Cargo = {
    car_nome: "",
    car_atribuicao: ""
  }

  closeResult = '';

  constructor(private cargoService: CargosService,
    private route: ActivatedRoute, private router: Router, private fb: FormBuilder, public dialog: MatDialog, private modalService: NgbModal) {
    this.form = this.fb.group({
      car_nome: ["", Validators.required],
      car_atribuicao: ["", Validators.required]
    })
  }

  ngOnInit(): void {
    this.cargo.id_cargo = this.route.snapshot.paramMap.get('id_cargo')
    this.mostrarCargo();
  }

  mostrarCargo() {
    this.cargoService.mostrarCargo(this.cargo.id_cargo).subscribe((resultado) => {
      this.cargo = resultado;
    })
  }

  excluirCargo() {
    this.cargoService.excluirCargo(this.cargo.id_cargo).subscribe({
      complete: () => {
        this.cargoService.mensagem("Cargo excluído com sucesso!")
        this.router.navigate([`/cargos`])
      },
      error: () => {
        this.cargoService.mensagem("Erro ao excluir o cargo.")
        this.router.navigate([`/cargos`])
      },
      next: () => console.log("Cargo excluído.")
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
