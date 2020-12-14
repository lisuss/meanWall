import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  firstName: String;
  lastName: String;
  username: String;
  email: String;
  password: String;

  constructor() { }

  ngOnInit(): void {
  }

  onRegisterSubmit() {
console.log(123);
  }

}
