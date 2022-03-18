import { User } from './../home/user';
import { AuthService } from './../home/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public user: User = new User();

  form!: FormGroup

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.form = this.fb.group({
      login: ["", Validators.required],
      senha: ["", Validators.required]
    })
  }

  ngOnInit(): void {
  }


  fazerLogin() {
    // console.log(this.user)

    this.authService.fazerLogin(this.user);

  }


}
