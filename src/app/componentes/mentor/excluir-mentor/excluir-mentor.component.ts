import { FuncionariosService } from 'src/app/services/funcionarios.service';
import { Mentor } from './../../../models/mentorModel';
import { MentorService } from './../../../services/mentor.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-excluir-mentor',
  templateUrl: './excluir-mentor.component.html',
  styleUrls: ['./excluir-mentor.component.scss']
})
export class ExcluirMentorComponent implements OnInit {

  form!: FormGroup

  closeResult = '';

  mentor: Mentor = {
    mentor_nome: "",
    mentor_cargo: "",
    mentor_cpf: "",
    mentor_foto: ""
  }

  id_cargo: String = ""

  constructor(private mentorService: MentorService,
    private route: ActivatedRoute, private fb: FormBuilder, private modalService: NgbModal, private location: Location, private funcService: FuncionariosService) {

    this.mentor.id_mentor = this.route.snapshot.paramMap.get("id_mentor");

    this.form = this.fb.group({
      mentor_nome: ["", Validators.required],
      mentor_cargo: ["", Validators.required],
      mentor_cpf: ["", Validators.required],
      mentor_foto: [""]
    })
  }

  ngOnInit(): void {
    this.buscarUmMentor();
    // this.buscarIdCargo();
  }

  buscarUmMentor(){
    this.mentorService.buscarUmMentor(this.mentor.id_mentor).subscribe((resultado)=>{
      // console.log(resultado);
      this.mentor = resultado;
      this.mentor.mentor_foto = resultado.mentor_foto.slice(11,100)
    })
  }

  // buscarIdCargo() {
  //   this.funcService.buscarIdCargo(this.func.id_funcionario).subscribe((resultado) => {
  //     this.id_cargo = resultado;
  //   })
  // }

  excluirMentor() {
    this.mentorService.excluirMentor(this.mentor.id_mentor).subscribe({
      complete: () => {
        this.funcService.mensagem("Mentor(a) excluído(a) com sucesso!")
        this.location.back();
      },
      error: () => {
        this.funcService.mensagem("Erro ao excluir mentor(a).")
        this.location.back();
      },
      next: () => console.log("Mentor(a) excluído(a)")
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
