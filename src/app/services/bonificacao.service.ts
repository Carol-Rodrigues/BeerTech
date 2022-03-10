import { Bonificacao } from './../models/bonificacaoModel';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BonificacaoService {

  baseUrl: String = "http://localhost:8080/empresa"

  constructor(private http: HttpClient) { }

  listarBonificacaoDoMentor(id_mentor: String): Observable<Bonificacao[]> {
    const URL = `${this.baseUrl}/mentor/bonificacao-mentor/${id_mentor}`
    return this.http.get<Bonificacao[]>(URL)
  }

  cadastrarBonificacao(bonificacao: Bonificacao, id_mentor: String): Observable<Bonificacao> {
    const URL = `${this.baseUrl}/mentor/bonificacao/${id_mentor}`
    return this.http.post<Bonificacao>(URL, bonificacao)
  }

  pagarBonificacao(bonificacao: Bonificacao, codigo: string): Observable<Bonificacao> {
    const URL = `${this.baseUrl}/mentor/pagarBonificacao/${codigo}`
    return this.http.put<Bonificacao>(URL, bonificacao)
  }

  cancelarBonificacao(bonificacao: Bonificacao, codigo: string): Observable<Bonificacao> {
    const URL = `${this.baseUrl}/mentor/cancelarBonificacao/${codigo}`
    return this.http.put<Bonificacao>(URL, bonificacao)
  }

  editarBonificacao(bonificacao: Bonificacao, codigo: string, id_mentor: string): Observable<Bonificacao> {
    const URL = `${this.baseUrl}/mentor/bonificacao-editar/${codigo}/${id_mentor}`
    return this.http.put<Bonificacao>(URL, bonificacao)
  }

  buscarUmaBonificacao(codigo: string):Observable<Bonificacao>{
    const URL = `${this.baseUrl}/mentor/bonificacao/${codigo}`
    return this.http.get<Bonificacao>(URL)
  }

  excluirBonificacao(codigo: string, id_mentor: string): Observable<Bonificacao> {
    const URL = `${this.baseUrl}/mentor/bonificacao-excluir/${codigo}/${id_mentor}`
    return this.http.delete<Bonificacao>(URL)
  }
}
