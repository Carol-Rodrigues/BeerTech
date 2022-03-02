import { MatSnackBar } from '@angular/material/snack-bar';
import { Cargo } from './../models/cargosModel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CargosService {

  baseUrl: String = 'http://localhost:8080/empresa'

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  // Para acessar BD
  mostrarTodos(): Observable<Cargo[]> {
    const URL = `${this.baseUrl}/cargo`
    return this.http.get<Cargo[]>(URL)
  }

  cadastrar(cargo: Cargo): Observable<Cargo> {
    const URL = `${this.baseUrl}/cargo`
    return this.http.post<Cargo>(URL, cargo)
  }

  mostrarCargo(id: string): Observable<Cargo> {
    const URL = `${this.baseUrl}/cargo/${id}`
    return this.http.get<Cargo>(URL)
  }

  excluirCargo(id: string): Observable<void> {
    const URL = `${this.baseUrl}/cargo/${id}`
    return this.http.delete<void>(URL)
  }

  editarCargo(cargo: Cargo): Observable<Cargo> {
    const URL = `${this.baseUrl}/cargo/${cargo.id_cargo}`
    return this.http.put<Cargo>(URL, cargo)
  }

  atribuirMentor(cargo: Cargo, id_cargo: String, id_mentor: String) {
    const URL = `${this.baseUrl}/cargo/definirMentor/${id_cargo}/${id_mentor}`
    return this.http.put<void>(URL, cargo)
  }

  // Método referente ao MatSnackBar do Material, para mostrar mensagem quando as funções de CRUD funcionarem
  mensagem(msg: string): void {
    this.snackBar.open(msg, "X", {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: ['cor-mensagem']
    })
  }//
}
