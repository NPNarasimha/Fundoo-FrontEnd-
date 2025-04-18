import { Component } from '@angular/core';
import { FormControl,FormGroup,Validators } from '@angular/forms';


@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
    RegisterForm=new FormGroup({
      firstName:new FormControl('',[Validators.required,Validators.minLength(2)]),
      lastname:new FormControl(''),
      DOB:new FormControl('',Validators.required),
      gender:new FormControl('',Validators.required),
      email:new FormControl('',[Validators.required, Validators.email]),
      password:new FormControl('',[Validators.required, Validators.minLength(6)])
    });
    onSubmit(){
      if(this.RegisterForm.valid){
        const formData=this.RegisterForm.value
        console.log("Register Success Full",formData);
        localStorage.setItem('userData', JSON.stringify(formData));
      }
    }
}
