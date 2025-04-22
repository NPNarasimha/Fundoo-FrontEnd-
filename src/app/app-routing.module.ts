import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import {RegisterComponent} from './Components/register/register.component'
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { AuthGuardService } from './services/auth-guard-folder/auth-guard.service';
import { ForgetPasswordComponent } from './Components/forget-password/forget-password.component'
import { CreatenoteComponent } from './Components/createnote/createnote.component';

const routes: Routes = [
  {path:"",component:LoginComponent}
  ,{path:"register",component:RegisterComponent}
  ,{path:"forgotpassword",component:ForgetPasswordComponent }
  ,{path:"dashboard",component:DashboardComponent,canActivate:[AuthGuardService],
    children:[{path:"createnote",component:CreatenoteComponent}]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
