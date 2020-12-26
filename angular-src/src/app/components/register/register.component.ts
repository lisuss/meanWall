import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service';

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

  constructor(private validateService: ValidateService) { }

  ngOnInit(): void {
  }

  onRegisterSubmit() {
    const user = {
      firstName: this.firstName,
      lastName: this.lastName,
      username: this.username,
      email: this.email,
      password: this.password
    }

    if (!this.validateService.validateRegister(user)) {
      console.log('Please fill in all fields');
      return false;
    }
  }

}
