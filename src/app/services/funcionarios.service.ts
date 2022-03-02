import { Funcionario } from './../models/funcionariosModel';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class FuncionariosService {

  baseUrl: string = "http://localhost:8080/empresa"

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  buscarFuncCargos(id_cargo: string): Observable<Funcionario[]> {
    const URL = `${this.baseUrl}/funcionario/busca-cargo/${id_cargo}` //tem que ser igual ao GetMapping do Eclipse (buscar de la que da pra entender os parametros)
    return this.http.get<Funcionario[]>(URL)
  }

  buscarUmFunc(id_funcionario: string):Observable<Funcionario>{
    const URL = `${this.baseUrl}/funcionario/${id_funcionario}` //tem que ser igual ao GetMapping do Eclipse
    return this.http.get<Funcionario>(URL)
  }

  cadastrarFunc(func: Funcionario, id_cargo: string): Observable<Funcionario> {
    const URL = `${this.baseUrl}/funcionario/?cargo=${id_cargo}` //tem que ser igual ao PostMapping do Eclipse
    return this.http.post<Funcionario>(URL, func)
  }

  excluirFunc(id_funcionario: string): Observable<void> {
    const URL = `${this.baseUrl}/funcionario/${id_funcionario}` //tem que ser igual ao DeleteMapping do Eclipse
    return this.http.delete<void>(URL)
  }

  buscarIdCargo(id_funcionario: string): Observable<string> {
    const URL = `${this.baseUrl}/funcionario/busca-id-cargo/${id_funcionario}` //tem que ser igual ao GetMapping do Eclipse
    return this.http.get<string>(URL)
  }

  editarFunc(func: Funcionario, id_funcionario: String, id_cargo: String): Observable<Funcionario> {
    const URL = `${this.baseUrl}/funcionario/${id_funcionario}?cargo=${id_cargo}` //tem que ser igual ao PutMapping do Eclipse
    return this.http.put<Funcionario>(URL, func)
  }

  buscarTodosFuncs(): Observable<any[]> {
    const URL = `${this.baseUrl}/funcionario/`
    return this.http.get<any[]>(URL)
  }

  funcsComCargos():Observable<any[]>{
    const url = `${this.baseUrl}/funcionario-cargo`
    return this.http.get<any[]>(url)
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