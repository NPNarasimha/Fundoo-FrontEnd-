import { Component, EventEmitter, Input, OnInit, Output,} from '@angular/core';
import { UpdateNoteComponent } from '../update-note/update-note.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-displaynotes',
  standalone: false,
  templateUrl: './displaynotes.component.html',
  styleUrl: './displaynotes.component.scss'
})
export class DisplaynotesComponent {
  
@Input() NotesList: any[] = [];
@Output() displaytogetallnotes = new EventEmitter<string>();
constructor(private dialog:MatDialog){}
opendialogue(notes: any) {
  const dialogRef = this.dialog.open(UpdateNoteComponent, {
    data: {
      title: notes.title,  // Ensure this is the correct property name
      description: notes.description,
      notesId: notes.noteid,
    }
  });
  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      console.log('Dialog closed with result:', result);
    }
  });
}
recievefromiconstodisplaycard($event: any) {
  console.log('Received from display Component:', $event);
  this.displaytogetallnotes.emit($event);
}
}
