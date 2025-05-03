import { Component, Input, OnInit } from '@angular/core';
import { NotesService } from '../../services/note/notes.service';

@Component({
  selector: 'app-display-all-notes',
  standalone: false,
  
  templateUrl: './display-all-notes.component.html',
  styleUrl: './display-all-notes.component.scss'
})
export class DisplayAllNotesComponent  {
  notesArray = [];
  constructor(private notes:NotesService){}
  @Input() isListView: boolean = false;
  ngOnInit(): void {
    this.getAllNotes();
    console.log("called");
  }
  getAllNotes() {
    this.notes.diplayAllNotes().subscribe((request: any) => {
      console.log('request data', request);
      this.notesArray = request.data;
      console.log(this.notesArray);
      this.notesArray.reverse();
        this.notesArray = this.notesArray.filter((notedata: any) => {
          return !notedata.isTrash && !notedata.isArchive && notedata.reminder;        
      });
    });
    console.log(this.notesArray);
  }
  receiveMessagefromdisplaycard($event: any) {
    console.log('insidegetallnotes', $event);
  if ($event === 'refresh') {
    this.getAllNotes();  
  }
  }
}