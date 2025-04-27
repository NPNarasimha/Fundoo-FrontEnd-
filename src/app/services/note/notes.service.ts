import { Injectable } from '@angular/core';
import { HttpService } from '../http-service/http.service';
import { HttpHeaders } from '@angular/common/http';

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
  diplayAllNotes(){
    const headers = this.Http.getHeaderToken();
    return this.Http.getApi("/getallnotes",headers);
  }
  updateColor(noteId: number, color: string) {
    const headers = this.Http.getHeaderToken(); 
    return this.Http.putApi(`/addcolor?noteId=${noteId}&color=${color}`,{},headers);
  }
  archiveNote(noteId: any){
    const headers = this.Http.getHeaderToken(); 
    return this.Http.putApi(`/notearchive?noteId=${noteId}`, {},headers) 
  }
  unarchiveNote(noteId: number) {
    const headers = this.Http.getHeaderToken(); 
    return this.Http.putApi(`/notearchive?noteId=${noteId}`, {},headers) 
  }

  trashNote(noteId:number){
    const headers = this.Http.getHeaderToken();
    return this.Http.putApi(`/trashnote?noteId=${noteId}`, {},headers)
  }

  updateNotes(note:any){
    
     
   
     const headers = this.Http.getHeaderToken();
    return this.Http.putApi(`/updatenotes?NotesId=${note.noteId}`,note,headers)
    
  }
}
