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

  buscarMentorCargo(id_cargo: String): Observable<Mentor> {
    const URL = `${this.baseUrl}/mentor-cargo/${id_cargo}`
    return this.http.get<Mentor>(URL)
  }

  buscarMentorSemCargo(): Observable<Mentor[]> {
    const URL = `${this.baseUrl}/mentorSemCargo`
    return this.http.get<Mentor[]>(URL)
  }

  mostrarTodosMentores(): Observable<any>{
    const URL = `${this.baseUrl}/mentor/mentor-cargo`
    return this.http.get<any>(URL)
  }

  buscarUmMentor(id_mentor:String):Observable<Mentor>{
    const url = `${this.baseUrl}/mentor/${id_mentor}`
    return this.http.get<Mentor>(url)
  }

  cadastrarMentor(mentor: Mentor): Observable<Mentor>{
    const URL = `${this.baseUrl}/mentor`
    return this.http.post<Mentor>(URL, mentor)
  }

  buscarMentorPeloNome(mentor_nome:String):Observable<Mentor>{
    const url = `${this.baseUrl}/mentor-nome/${mentor_nome}`
    return this.http.get<Mentor>(url)
  }

  excluirMentor(id_mentor: string): Observable<void> {
    const URL = `${this.baseUrl}/mentor/${id_mentor}` //tem que ser igual ao DeleteMapping do Eclipse
    return this.http.delete<void>(URL)
  }

  // ESTÁ DELETANDO CARGO AO EDITAR MENTOR
  // editarMentor(mentor: Mentor, id_mentor: string): Observable<Mentor> {
  //   const URL = `${this.baseUrl}/mentor/${id_mentor}` //tem que ser igual ao PutMapping do Eclipse
  //   return this.http.put<Mentor>(URL, mentor)
  // }

  editarMentor(mentor: Mentor, id_mentor: string, id_cargo: String): Observable<Mentor> {
    const URL = `${this.baseUrl}/mentor/${id_mentor}?cargo=${id_cargo}` //tem que ser igual ao PutMapping do Eclipse
    return this.http.put<Mentor>(URL, mentor)
  }

  editarMentorSemCargo(mentor: Mentor, id_mentor:String): Observable<Mentor> {
    const URL = `${this.baseUrl}/mentorSemCargo/${id_mentor}` //tem que ser igual ao PutMapping do Eclipse
    return this.http.put<Mentor>(URL, mentor)
  }
}
