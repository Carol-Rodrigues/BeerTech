import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  form!: FormGroup

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      login: ["", Validators.required],
      senha: ["", Validators.required]
    })
  }

  ngOnInit(): void {
  }

}
