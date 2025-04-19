import { Component,OnInit } from '@angular/core';
import { FormControl,FormGroup,Validators } from '@angular/forms';
import { UserService } from '../../services/users/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit{
  RegisterForm!: FormGroup;
constructor(private user:UserService,private snackBar:MatSnackBar){}
  ngOnInit() {
   this.RegisterForm=new FormGroup({
      firstName:new FormControl('',[Validators.required,Validators.minLength(2)]),
      lastname:new FormControl(''),
      DOB:new FormControl('',Validators.required),
      gender:new FormControl('',Validators.required),
      email:new FormControl('',[Validators.required, Validators.email]),
      password:new FormControl('',[Validators.required, Validators.minLength(6)])
    });
  }
    
    onSubmit(){
      if(this.RegisterForm.valid){
        const formData=this.RegisterForm.value
        console.log("Register Successfull",formData);
        //localStorage.setItem('userData', JSON.stringify(formData));
        
        const payload = {
          firstName: this.RegisterForm.value.firstName,
          lastName: this.RegisterForm.value.lastname,
          dob: new Date(this.RegisterForm.value.DOB).toISOString(), 
          gender: this.RegisterForm.value.gender,
          email: this.RegisterForm.value.email,
          password: this.RegisterForm.value.password
        }; 
        this.user.register(payload).subscribe({
          next:(result:any)=>{
            console.log(result);
             this.snackBar.open('Signup successful!', 'Close', {
               duration: 3000,
               //it used to add css
               //panelClass:["SnackBar-success"]
            });
          },
          error:(err)=>{
            this.snackBar.open('Signup unsuccessful!.Please try again.', 'Close', {
              duration: 3000,
              //panelClass:["SnackBar-success"]
          });
          }
        });
      }else{
        this.snackBar.open('Please fill all fields correctly.', 'Close', {
          duration: 3000,
          //panelClass: ['snackbar-error']
        });
      }
  }
}
