import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NotesService } from '../../services/note/notes.service';

@Component({
  selector: 'app-update-note',
  standalone: false,
  templateUrl: './update-note.component.html',
  styleUrl: './update-note.component.scss'
})
export class UpdateNoteComponent {
  title: string = '';
  description: string = '';
  notesId: number;

  constructor(
    private notes: NotesService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<UpdateNoteComponent>
  ) {
    this.title = data?.title || '';
    this.description = data?.description || '';
    this.notesId = data?.NotesId || null;
  }

  onSubmit(): void {
    this.updateNote();
  }

  updateNote() {
    const payload = {
      NotesId: this.notesId,
      Title: this.title,
      Description: this.description
    };
    
    this.notes.updateNotes(payload).subscribe({
      next: (response: any) => {
        console.log('Update success:', response);
        this.ref.close(response);
      },
      error: (err) => {
        console.error('Update failed:', err);
      }
    });
  }
}
