import { HttpClient, httpResource } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from '../http-service/http.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private Http : HttpService) { }
  register(payload:any){
    return this.Http.postApi("/register",payload)
  }
  login(payload:any){
    return this.Http.postApi("/login",payload)
  }
}
