import { Router } from '@angular/router';
import { User } from './user';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usuarioAutenticado: boolean = false;

  constructor(private router: Router) { }

  fazerLogin(user: User) {

    if(user.nome === 'admin@mail.com' && user.senha === '1234') {
      this.usuarioAutenticado = true;
      this.router.navigate(['/funcionarios'])
    } else {
      this.usuarioAutenticado = false;
    }
  }

  usuarioEstaAutenticado() {
    return this.usuarioAutenticado;
  }
}
