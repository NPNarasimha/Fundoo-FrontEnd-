import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  LoginForm=new FormGroup({
    email:new FormControl('',[Validators.required, Validators.email]),
    password:new FormControl('',[Validators.required, Validators.minLength(6)])
  });
  onSubmit() {
    if (this.LoginForm.valid) {
      console.log('Login Successful', this.LoginForm.value);
      const userData=this.LoginForm.value;
      localStorage.setItem('userData', JSON.stringify(userData));
    }
    else{
      console.log("Fill all the field Correct");
    }
  }
}

