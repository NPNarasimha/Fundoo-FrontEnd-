import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/users/user.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
   LoginForm!: FormGroup;
    constructor(private user:UserService){}
  ngOnInit(): void {
  this.LoginForm=new FormGroup({
    email:new FormControl('',[Validators.required, Validators.email]),
    password:new FormControl('',[Validators.required, Validators.minLength(6)])
  });
}
  onSubmit() {
    if (this.LoginForm.valid) {
      console.log('Login Successful', this.LoginForm.value);
      //const userData=this.LoginForm.value;
      //localStorage.setItem('userData', JSON.stringify(userData));
      const payload = {
        email:this.LoginForm.value.email,
        password:this.LoginForm.value.password
      };
      this.user.login(payload).subscribe({
        next:(result)=>{
          console.log(result);
        },
        error:(err)=>{
          console.log(err);
        }
      });
    }
    else{
      console.log("Fill all the field Correct");
    }
  }
}


