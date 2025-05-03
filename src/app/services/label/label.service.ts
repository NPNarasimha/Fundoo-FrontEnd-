import { Injectable } from '@angular/core';
import { HttpService } from '../http-service/http.service';

@Injectable({
  providedIn: 'root'
})
export class LabelService {
token:any
  constructor(private Http:HttpService) { 
    this.token=this.Http.getHeader();
  }

createLabel(payload:any){
  const headers = this.Http.getHeaderToken();
  return this.Http.postApi("/createlabel",payload,headers);
  }
displayLabels(){
  const headers = this.Http.getHeaderToken();
  return this.Http.getApi("/getalllabels",headers);
}
updateLabel(oldName: string, payload: any) {
  const headers = this.Http.getHeaderToken();
  return this.Http.postApi(`/updateLabel?name=${oldName}`, payload, headers);
}
deleteLabel(payload:any){
  const headers = this.Http.getHeaderToken();
  return this.Http.deleteApi(`/deletelabelfromnote`,headers);
}

}
