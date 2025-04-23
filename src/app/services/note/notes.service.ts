import { Injectable } from '@angular/core';
import { HttpService } from '../http-service/http.service';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
token:any
  constructor(private Http : HttpService) {
    this.token=this.Http.getHeader();
   }
  createNotes(payload:any){
    const headers = this.Http.getHeaderToken();
    return this.Http.postApi("/addnotes",payload,headers);
  }
}
