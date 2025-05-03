import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UpdateNoteComponent } from '../update-note/update-note.component';
import { ViewsService } from '../../services/views/views.service';

@Component({
  selector: 'app-displaynotes',
  standalone: false,
  templateUrl: './displaynotes.component.html',
  styleUrl: './displaynotes.component.scss'
})
export class DisplaynotesComponent implements OnInit {
  lastReminderNoteId: number | null = null;
  @Input() NotesList: any[] = [];
  @Output() displaytogetallnotes = new EventEmitter<string>();
  @Input() selectedItem: string = '';
  isListView: boolean = false;
  constructor(private dialog: MatDialog,private viewservice:ViewsService) {}
  ngOnInit(): void {
    console.log(this.isListView);
    this.viewservice.isListView$.subscribe(view => {
      this.isListView = view;
    });
  }
  
  opendialogue(notes: any) {
    const dialogRef = this.dialog.open(UpdateNoteComponent, {
      data: {
        title: notes.title,
        description: notes.description,
        NotesId: notes.notesId
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Dialog closed with update result:', result);
        this.displaytogetallnotes.emit('refresh');
      }
    });
  }

  recievefromiconstodisplaycard($event: any) {
    console.log('Received from icons:', $event);
    if ($event === 'refresh') {
      this.displaytogetallnotes.emit('refresh'); 
    }
  }
  
}
