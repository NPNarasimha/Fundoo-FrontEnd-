import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import {RegisterComponent} from './Components/register/register.component'
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { AuthGuardService } from './services/auth-guard-folder/auth-guard.service';

const routes: Routes = [
  {path:"",component:LoginComponent}
  ,{path:"register",component:RegisterComponent}
  ,{path:"dashboard",component:DashboardComponent,canActivate:[AuthGuardService],
    //children:[]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
