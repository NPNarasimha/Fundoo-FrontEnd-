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
    return this.Http.putApi(`/addcolor?noteId=${noteId}&color=${color}`,{color}, headers);
  }
  
  // archiveNote(noteId: any){
  //   //const head = this.Http.getHeaderToken(); 
  //   //console.log(head.headers);
  //   const token = localStorage.getItem('Token');
  //       const header= new HttpHeaders({
  //         //Authorization: token?.startsWith('Bearer ') ? token : `Bearer ${token}`
  //        Authorization: `Bearer ${token}`
  //       });
  //       console.log(token,header);
  //   return this.Http.putApi(`/notearchive?noteId=${noteId}`, {},header) 
  // }
  archiveNote(noteId:number){
    const t = localStorage.getItem('Token');
    console.log(t);
     let headers= new HttpHeaders(
        {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${t}`
        })
    
    return this.Http.putApi(`/notearchive?noteId=${noteId}`,{}, headers)
  }
  unarchiveNote(noteId: number){
    const headers = this.Http.getHeaderToken(); 
    return this.Http.putApi(`/notearchive?noteId=${noteId}`, {},headers) 
  }

  trashNote(noteId:number){
    const headers = this.Http.getHeaderToken();
    return this.Http.putApi(`/trashnote?noteId=${noteId}`, {},headers)
  }
  deleteNotePermanently(noteId:number){
    const headers = this.Http.getHeaderToken();
    return this.Http.deleteApi(`/deletenotes?NotesId=${noteId}`,headers)
  }
  updateNotes(note:any){  
     const headers = this.Http.getHeaderToken();
    return this.Http.putApi(`/updatenotes?NotesId=${note.NotesId}`,note,headers)
  }
  setReminder(noteId: number, reminder: string) {
    const headers = this.Http.getHeaderToken();
    return this.Http.putApi(`/remindernote?noteId=${noteId}&reminder=${encodeURIComponent(reminder)}`, {}, headers);
  }
}
