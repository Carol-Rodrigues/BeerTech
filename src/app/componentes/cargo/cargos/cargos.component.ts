import { ActivatedRoute } from '@angular/router';
import { CargosService } from '../../../services/cargos.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cargos',
  templateUrl: './cargos.component.html',
  styleUrls: ['./cargos.component.scss']
})
export class CargosComponent implements OnInit {

  cargos: any = [];

  constructor(private cargosService: CargosService, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.mostrarCargos()
  }

  mostrarCargos(){
    this.cargosService.buscarTodosCargos().subscribe(resultado =>{
      console.log("aqui")
      console.log(this.cargos)

      resultado.forEach((cargo: any[]) => {

        let cargoComMentor: any ={
          id_cargo:'',
          car_nome:'',
          car_atribuicao: '',
          id_mentor:'',
          mentor_nome:'',
          mentor_cargo:''
        }

        cargoComMentor.id_cargo = cargo[0]
        cargoComMentor.car_nome = cargo[1]
        cargoComMentor.car_atribuicao = cargo[2]
        if(cargo[3] != null){
          cargoComMentor.id_mentor = cargo[3]
          cargoComMentor.mentor_nome = cargo[4]
          cargoComMentor.mentor_cargo = cargo[5]
        }else{
          cargoComMentor.id_mentor = 0
          cargoComMentor.mentor_nome = "----"
          cargoComMentor.mentor_cargo = "----"
        }


        this.cargos.push(cargoComMentor)
        console.log(this.cargos)

      });


    })
  }

}
