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

  // READ -- buscar todos os cargos
  mostrarTodos(): Observable<Cargo[]> {
    const URL = `${this.baseUrl}/cargo`
    return this.http.get<Cargo[]>(URL)
  }

  // CREATE -- cadastrar cargo
  cadastrar(cargo: Cargo): Observable<Cargo> {
    const URL = `${this.baseUrl}/cargo`
    return this.http.post<Cargo>(URL, cargo)
  }

  // READ by ID -- ler cargo específico
  mostrarCargo(id: string): Observable<Cargo> {
    const URL = `${this.baseUrl}/cargo/${id}`
    return this.http.get<Cargo>(URL)
  }

  // DELETE by ID -- deletar cargo específico
  excluirCargo(id: string): Observable<void> {
    const URL = `${this.baseUrl}/cargo/${id}`
    return this.http.delete<void>(URL)
  }

  // UPDATE by ID -- atualizar mentor pelo ID, trazemos também o cargo para não perdê-lo na edição
  editarCargo(cargo: Cargo): Observable<Cargo> {
    const URL = `${this.baseUrl}/cargo/${cargo.id_cargo}`
    return this.http.put<Cargo>(URL, cargo)
  }

  // UPDATE para vincular mentor ao cargo
  atribuirMentor(cargo: Cargo, id_cargo: String, id_mentor: String) {
    const URL = `${this.baseUrl}/cargo/definirMentor/${id_cargo}/${id_mentor}`
    return this.http.put<void>(URL, cargo)
  }

  // READ -- função de GET para buscar todos os mentores
  mostrarCargosSemMentor():Observable<Cargo[]>{
    const url = `${this.baseUrl}/cargoSemMentor`
    return this.http.get<Cargo[]>(url)
  }

  // READ by ID -- função de GET para buscar mentor e cargo -- passamos o parâmetro de cargo, para utilizar na função de edição
  buscarCargoDoMentor(id_mentor:String):Observable<Cargo>{
    const url = `${this.baseUrl}/cargo/cargo-mentor/${id_mentor}`
    return this.http.get<Cargo>(url)
  }

  // READ -- função de GET para buscar todos os cargos
  buscarTodosCargos():Observable<any>{
    const url = `${this.baseUrl}/cargo/cargo-mentor`
    return this.http.get<any>(url)
  }

  // UPDATE by ID -- deixar mentor sem cargo
  deixarCargoSemMentor(cargo:Cargo,id_cargo:String, id_mentor:String):Observable<void>{
    const url = `${this.baseUrl}/cargo/tirarMentor/${id_cargo}/${id_mentor}`
    return this.http.put<void>(url,cargo);
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
