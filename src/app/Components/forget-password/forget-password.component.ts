import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/users/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-forget-password',
  standalone: false,
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss'] 
})
export class ForgetPasswordComponent implements OnInit {
  forgotForm!: FormGroup;

  constructor(private user: UserService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.forgotForm = new FormGroup({
      email: new FormControl('', [Validators.email])
    });
  }

  onSubmit() {
    if (this.forgotForm.valid) {
      console.log('Email sent Successful', this.forgotForm.value)
      const payload = { Email: this.forgotForm.value.email };
      this.user.ForgetPassword(payload).subscribe({
        next: (res: any) => {
          console.log(res);
          this.snackBar.open('Password reset link sent to your email', 'Close', { duration: 3000 });
        },
        error: (err) => {
          console.error(err);
          const errorMessage = err.error?.message || 'Failed to send reset link. Try again.';
          this.snackBar.open(errorMessage, 'Close', { duration: 3000 });
           
        }
      });
    } else {
      this.snackBar.open('Please enter a valid email.', 'Close', { duration: 3000 });
    }
  }
}  
