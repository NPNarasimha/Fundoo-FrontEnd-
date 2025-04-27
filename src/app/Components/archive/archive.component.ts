import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NotesService } from '../../services/note/notes.service';

@Component({
  selector: 'app-archive',
  standalone: false,
  templateUrl: './archive.component.html',
  styleUrl: './archive.component.scss'
})
export class ArchiveComponent implements OnInit {
  @Output() displaytogetallnotes = new EventEmitter<string>();

  token: any;
  notesArray: any;
  noteData: any;
  message: any;
  public subscription: any;

  constructor(private notes: NotesService) {
    this.token = localStorage.getItem('token');
  }

  ngOnInit(): void {
    this.getAllNotes();
  }

  getAllNotes() {
    this.notes.diplayAllNotes().subscribe((request: any) => {
      console.log('request data', request);
      this.notesArray = request.data;
      console.log(this.notesArray);
      this.notesArray = this.notesArray.filter((notedata: any) => {
        return notedata.isArchive===true;
      });
    });
    
  }
  receiveMessagefromdisplaycard($event: any) {
    console.log('insidegetallnotes', $event);
    this.getAllNotes();
}
}
