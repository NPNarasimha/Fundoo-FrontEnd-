import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NotesService } from '../../services/note/notes.service';

@Component({
  selector: 'app-update-note',
  standalone: false,
  templateUrl: './update-note.component.html',
  styleUrl: './update-note.component.scss'
})
export class UpdateNoteComponent implements OnInit{
  title: any;
  description: any;
  id: any;
  constructor( private notes: NotesService,@Inject(MAT_DIALOG_DATA) public data:any ,
  private ref:MatDialogRef<UpdateNoteComponent>)
  {
    console.log('Dialog data received:', data);
    this.title = data?.title || '';
    this.description = data?.description || '';
    this.id = data?.noteId || null;
  }
  onNoClick(): void {
    console.log('Closing the dialog');
    this.ref.close();
  }
  ngOnInit(): void {
   
  }
onSubmit(){
  if (!this.id) {
    console.error('Note ID is missing');
  }
  let payload = {
    tittle: this.title,
    description: this.description,
    noteid: this.id,
    
  };
  console.log('Payload for update:', payload);
  this.notes.updateNotes(payload).subscribe({
    next: (response: any) => {
      console.log('Update response:', response);
      this.ref.close(true);
    },
    error: (err) => {
      console.log('Error updating note:', err);
    }
});
this.ref.close();
}
}
