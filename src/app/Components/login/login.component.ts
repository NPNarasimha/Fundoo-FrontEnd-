import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/users/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
   LoginForm!: FormGroup;
    constructor(private user:UserService, private snackBar: MatSnackBar,private router:Router){}
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
      //localStorage.setItem('token', JSON.stringify(userData.Data));
      const payload = {
        email:this.LoginForm.value.email,
        password:this.LoginForm.value.password
      };
      this.user.login(payload).subscribe({
        next:(result:any)=>{
          console.log(result.message);
          localStorage.setItem("Token",result.data)
          this.router.navigate(['dashboard'])
          this.snackBar.open("Login Success","close",{
            duration:3000,
            //this is used for adding css to snack bar
            //panelClass:["SnackBar-success"]
          })
        },
        error:(err)=>{
          console.log(err);
          this.snackBar.open('Login unsuccessful. Please try again.', 'Close', {
            duration: 3000,
            //panelClass: ['snackbar-error']
          });
        }
      });
    }
    else{
      this.snackBar.open('Please fill all fields correctly.', 'Close', {
        duration: 3000,
        //panelClass: ['snackbar-error']
      });
    }
  }
}


