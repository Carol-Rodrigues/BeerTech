import { Cargo } from './../models/cargosModel';
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

  // READ by ID -- função de GET para buscar func e cargo -- passamos o parâmetro de cargo, para utilizar na função de edição
  buscarFuncCargos(id_cargo: string): Observable<Funcionario[]> {
    const URL = `${this.baseUrl}/funcionario/busca-cargo/${id_cargo}` //tem que ser igual ao GetMapping do Eclipse (buscar de la que da pra entender os parametros)
    return this.http.get<Funcionario[]>(URL)
  }

  // READ bY ID -- função GET para buscar func específico -- utilizado para exclusão
  buscarUmFunc(id_funcionario: string):Observable<Funcionario>{
    const URL = `${this.baseUrl}/funcionario/${id_funcionario}` //tem que ser igual ao GetMapping do Eclipse
    return this.http.get<Funcionario>(URL)
  }

  // CREATE -- cadastrar func
  cadastrarFunc(func: Funcionario): Observable<Funcionario> {
    const URL = `${this.baseUrl}/funcionario` //tem que ser igual ao PostMapping do Eclipse
    return this.http.post<Funcionario>(URL, func)
  }

  // DELETE by ID -- deletar func específico
  excluirFunc(id_funcionario: string): Observable<void> {
    const URL = `${this.baseUrl}/funcionario/${id_funcionario}` //tem que ser igual ao DeleteMapping do Eclipse
    return this.http.delete<void>(URL)
  }

  // READ by ID -- função de GET para buscar func e cargo -- passamos o parâmetro de cargo, para utilizar na função de edição
  buscarIdCargo(id_funcionario: string): Observable<string> {
    const URL = `${this.baseUrl}/funcionario/busca-id-cargo/${id_funcionario}` //tem que ser igual ao GetMapping do Eclipse
    return this.http.get<string>(URL)
  }

  // UPDATE by ID -- atualizar func pelo ID, trazemos também o cargo para não perdê-lo na edição
  editarFunc(func: Funcionario, id_funcionario:String, id_cargo: String): Observable<Funcionario> {
    const URL = `${this.baseUrl}/funcionario/${id_funcionario}?cargo=${id_cargo}` //tem que ser igual ao PutMapping do Eclipse
    return this.http.put<Funcionario>(URL, func)
  }

  // UPDATE by ID -- atualizar func pelo ID, para func sem cargo
  editarFuncSemCargo(func: Funcionario, id_funcionario:String): Observable<Funcionario> {
    const URL = `${this.baseUrl}/funcionarioSemCargo/${id_funcionario}` //tem que ser igual ao PutMapping do Eclipse
    return this.http.put<Funcionario>(URL, func)
  }

  // READ -- função de GET para buscar todos os func
  buscarTodosFuncs(): Observable<any> {
    const URL = `${this.baseUrl}/funcionario-cargo`
    return this.http.get<any>(URL)
  }

  // UPDATE by ID -- alterar cargo
  atribuirCargo(cargo: Cargo, id_funcionario:String):Observable<Funcionario>{
    const url = `${this.baseUrl}/funcionario/inserirCargo/${id_funcionario}`
    return this.http.put<Funcionario>(url,cargo)
  }

  // UPDATE by ID -- deixar funcionario sem cargo
  deixarFuncSemCargo(func: Funcionario, id_funcionario:String):Observable<Funcionario>{
    const url = `${this.baseUrl}/funcionario/deixarSemCargo/${id_funcionario}`
    return this.http.put<Funcionario>(url,func)
  }

  // READ by CPF -- para vincular o cadastro da foto
  buscarFuncPeloCpf(func_cpf:String):Observable<Funcionario>{
    const url = `${this.baseUrl}/funcionario-cpf/${func_cpf}`
    return this.http.get<Funcionario>(url)
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
