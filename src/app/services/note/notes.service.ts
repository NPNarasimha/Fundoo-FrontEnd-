import { Injectable } from '@angular/core';
import { HttpService } from '../http-service/http.service';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(private Http : HttpService) { }
  createNotes(payload:any){
    return this.Http.postApi("/addnotes",payload)
  }
}
