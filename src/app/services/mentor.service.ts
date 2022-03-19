import { Mentor } from './../models/mentorModel';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MentorService {

  baseUrl: String = "http://localhost:8080/empresa"

  constructor(private http: HttpClient) { }

  // READ by ID -- função de GET para buscar mentor e cargo -- passamos o parâmetro de cargo, para utilizar na função de edição
  buscarMentorCargo(id_cargo: String): Observable<Mentor> {
    const URL = `${this.baseUrl}/mentor-cargo/${id_cargo}`
    return this.http.get<Mentor>(URL)
  }

  // READ -- função de GET para buscar todos os mentores, que estiverem sem cargo -- para utilizar na função de edição
  buscarMentorSemCargo(): Observable<Mentor[]> {
    const URL = `${this.baseUrl}/mentorSemCargo`
    return this.http.get<Mentor[]>(URL)
  }

  // READ -- função de GET para buscar todos os mentores
  mostrarTodosMentores(): Observable<any>{
    const URL = `${this.baseUrl}/mentor/mentor-cargo`
    return this.http.get<any>(URL)
  }

  // READ bY ID -- função GET para buscar mentor específico -- utilizado para exclusão
  buscarUmMentor(id_mentor:String):Observable<Mentor>{
    const url = `${this.baseUrl}/mentor/${id_mentor}`
    return this.http.get<Mentor>(url)
  }

  // CREATE -- cadastrar mentor
  cadastrarMentor(mentor: Mentor): Observable<Mentor>{
    const URL = `${this.baseUrl}/mentor`
    return this.http.post<Mentor>(URL, mentor)
  }

  // DELETE by ID -- deletar mentor específico
  excluirMentor(id_mentor: string): Observable<void> {
    const URL = `${this.baseUrl}/mentor/${id_mentor}` //tem que ser igual ao DeleteMapping do Eclipse
    return this.http.delete<void>(URL)
  }

  // UPDATE by ID -- atualizar mentor pelo ID, trazemos também o cargo para não perdê-lo na edição
  editarMentor(mentor: Mentor, id_mentor: string, id_cargo: String): Observable<Mentor> {
    const URL = `${this.baseUrl}/mentor/${id_mentor}?cargo=${id_cargo}` //tem que ser igual ao PutMapping do Eclipse
    return this.http.put<Mentor>(URL, mentor)
  }

  // UPDATE by ID -- deixar mentor sem cargo
  editarMentorSemCargo(mentor: Mentor, id_mentor:String): Observable<Mentor> {
    const URL = `${this.baseUrl}/mentorSemCargo/${id_mentor}` //tem que ser igual ao PutMapping do Eclipse
    return this.http.put<Mentor>(URL, mentor)
  }

  // READ by CPF -- para vincular o cadastro da foto
  buscarMentorPeloCpf(mentor_cpf:String):Observable<Mentor>{
    const url = `${this.baseUrl}/mentor-cpf/${mentor_cpf}`
    return this.http.get<Mentor>(url)
  }
}
