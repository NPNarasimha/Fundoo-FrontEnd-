import { Component, EventEmitter, Output } from '@angular/core';
import { NotesService } from '../../services/note/notes.service';

@Component({
  selector: 'app-remindernotes',
  standalone: false,
  templateUrl: './remindernotes.component.html',
  styleUrl: './remindernotes.component.scss'
})
export class RemindernotesComponent {
 token:any;
  constructor(private notes: NotesService) {
    this.token = localStorage.getItem('token');
  }
  notesArray: any;
  @Output() displaytogetallnotes = new EventEmitter<string>();
  ngOnInit(): void {
    this.getAllNotes();
  }
  getAllNotes() {
    this.notes.diplayAllNotes().subscribe((request: any) => {
      console.log('request data', request);
      this.notesArray = request.data;
      console.log(this.notesArray);
      this.notesArray = this.notesArray.filter((notedata: any) => {
        return notedata.reminder;
      });
    });
  }
  receiveMessagefromdisplaycard($event: any) {
    console.log('insidegetallnotes', $event);
    this.getAllNotes();
  }
}
