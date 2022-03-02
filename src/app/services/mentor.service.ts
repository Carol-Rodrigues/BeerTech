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

  mostrarTodosMentores(): Observable<Mentor[]>{
    const URL = `${this.baseUrl}/mentor`
    return this.http.get<Mentor[]>(URL)
  }

}
