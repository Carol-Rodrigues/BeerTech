import { ActivatedRoute } from '@angular/router';
import { CargosService } from '../../../services/cargos.service';
import { Cargo } from '../../../models/cargosModel';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-cargos',
  templateUrl: './cargos.component.html',
  styleUrls: ['./cargos.component.scss']
})
export class CargosComponent implements OnInit {

  cargos: Cargo[] = [];

  constructor(private cargosService: CargosService, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.mostrarCargos()
  }

  mostrarCargos() {
    this.cargosService.mostrarTodos().subscribe(resultado => {
      this.cargos = resultado;
    })
  }

}
