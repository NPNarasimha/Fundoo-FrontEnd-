import { Component, EventEmitter, Output } from '@angular/core';
import { NotesService } from '../../services/note/notes.service';

@Component({
  selector: 'app-trash',
  standalone: false,
  templateUrl: './trash.component.html',
  styleUrl: './trash.component.scss'
})
export class TrashComponent {
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
        return notedata.isTrash === true;
      });
    });
  }
  receiveMessagefromdisplaycard($event: any) {
    console.log('insidegetallnotes', $event);
    this.getAllNotes();
  }
}
