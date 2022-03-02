import { MentorService } from './../../../services/mentor.service';
import { Mentor } from './../../../models/mentorModel';
import { MatPaginator } from '@angular/material/paginator';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-mentores',
  templateUrl: './mentores.component.html',
  styleUrls: ['./mentores.component.scss']
})
export class MentoresComponent implements OnInit {

  // Variável para mat-table
  displayedColumns: string[] = [
    'id',
    'nome',
    'cargo',
    'foto',
    'mentorado',
    'ocupado'
  ];

  // Variável para armazenar os mentores na tabela
  tabelaMentor: any;

  // paginator
  @ViewChild("paginatorMentor") paginatorFunc!: MatPaginator;
  // estabelecendo breakpoint do paginator
  bpPaginator: boolean = false;

  mentores: Mentor[] = []

  constructor(private mentorService: MentorService) { }

  ngOnInit(): void {
    this.mostrarTodosMentores()
  }

  mostrarTodosMentores() {
    this.mentorService.mostrarTodosMentores().subscribe((res) => {
      this.mentores = res
      this.tabelaMentor = res
    })
  }

  filtrar(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tabelaMentor.filter = filterValue.trim().toLowerCase();

    if (this.tabelaMentor.paginator) {
      this.tabelaMentor.paginator.firstPage();
    }
  }

}
