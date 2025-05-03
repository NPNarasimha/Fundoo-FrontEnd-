import { Injectable } from '@angular/core';
import { HttpService } from '../http-service/http.service';

@Injectable({
  providedIn: 'root'
})
export class CollabratorService {
  constructor(private Http:HttpService) { }
  addCollaborator(noteId: number, email: string) {
    const headers = this.Http.getHeaderToken();
    const payload = { email: email };
    return this.Http.postApi(`/addcollabrator?noteId=${noteId}&email=${email}`, payload, headers);
  }
  getAllCollabrator(){
    const headers=this.Http.getHeaderToken();
    return this.Http.getApi(`/getallcolabrators`,headers);
  }
  removeCollaborator(collabId: number) {
    const headers = this.Http.getHeaderToken();
    return this.Http.deleteApi(`/removecollabrator?collabId=${collabId}`, headers);
  }
}
