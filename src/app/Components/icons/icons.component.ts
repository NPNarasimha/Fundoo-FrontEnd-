import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NotesService } from '../../services/note/notes.service';
import { MatDialog } from '@angular/material/dialog';
import { CollaboratorComponent } from '../collaborator/collaborator.component';
import { ReminderComponent } from '../reminder/reminder.component';
import { LabelService } from '../../services/label/label.service';
import { CreatelabelComponent } from '../createlabel/createlabel.component';


@Component({
  selector: 'app-icons',
  standalone: false,
  templateUrl: './icons.component.html',
  styleUrl: './icons.component.scss'
})
export class IconsComponent implements OnInit{
  @Input() notesCard: any;
  @Input() view: string = '';
  @Input() showReminders: boolean = false;
  @Output() iconstodisplay = new EventEmitter<any>();

  colors: string[] = ['#f28b82', '#fbbc04', '#fff475', '#ccff90', '#a7ffeb', '#cbf0f8', '#aecbfa', '#d7aefb'];
  isColorPickerVisible: boolean = false;
  reminderList =[];
  constructor(private note: NotesService,private labelService:LabelService, private cdr: ChangeDetectorRef,private dialog: MatDialog) {}

ngOnInit(){
  console.log(this.view);
  }
  toggleColorPicker(event: MouseEvent) {
    event.stopPropagation();
    this.isColorPickerVisible = !this.isColorPickerVisible;
  }

  

  selectColor(color: string, event: MouseEvent) {
    event.stopPropagation();
  
    const noteId = this.notesCard?.notesId;
    if (!noteId) {
      // New note creation context — emit the selected color only
      this.iconstodisplay.emit({ type: 'color', color });
      this.isColorPickerVisible = false;
      return;
    }
  
    // Existing note: update backend
    this.note.updateColor(noteId, color).subscribe({
      next: (response: any) => {
        if (response.success) {
          console.log('Color updated successfully:', response);
          this.notesCard.color = color;
          this.iconstodisplay.emit({ type: 'color', noteId, color });
        } else {
          console.error('Error updating color:', response.message);
        }
      },
      error: (err) => console.error('Error updating color in backend:', err)
    });
  
    this.isColorPickerVisible = false;
  }

  toArchive(event: MouseEvent) {
    event.stopPropagation();
    const noteId = this.notesCard?.notesId;
    if (!noteId) return console.error('Note ID missing');

    const action = this.notesCard.archive ? this.note.unarchiveNote : this.note.archiveNote;

    action.call(this.note, noteId).subscribe({
      next: (response: any) => {
        console.log(this.notesCard.archive ? 'Unarchived' : 'Archived', response);
        this.iconstodisplay.emit('refresh');
      },
      error: (err) => console.error('Error updating archive status:', err)
    });
  }

  trash(event: MouseEvent) {
    event.stopPropagation();
    const noteId = this.notesCard?.notesId;
    if (!noteId) return console.error('Note ID missing');

    this.note.trashNote(noteId).subscribe({
      next: (response: any) => {
        console.log('Moved to trash:', response);
        this.iconstodisplay.emit('refresh');
      },
      error: (err) => console.error('Error trashing:', err)
    });
  }

  restoreNote(event: MouseEvent) {
    event.stopPropagation();
    const noteId = this.notesCard?.notesId;
    if (!noteId) return console.error('Note ID missing');

    this.note.trashNote(noteId).subscribe({
      next: (response: any) => {
        console.log('Restored note:', response);
        this.iconstodisplay.emit('refresh');
      },
      error: (err) => console.error('Error restoring:', err)
    });
  }

  deleteNotePermanently(event: MouseEvent) {
    event.stopPropagation();
    const noteId = this.notesCard?.notesId;
    if (!noteId) return console.error('Note ID missing');

    this.note.deleteNotePermanently(noteId).subscribe({
      next: (response: any) => {
        console.log('Permanently deleted:', response);
        this.iconstodisplay.emit('refresh');
      },
      error: (err) => console.error('Error deleting permanently:', err)
    });
  }

  openCollaboratorsDialog(event: MouseEvent, notes: any) {
    event.stopPropagation();
    if (!notes?.notesId) return console.error('Invalid note data:', notes);

    const dialogRef = this.dialog.open(CollaboratorComponent, {
      data: {
        noteId: notes.notesId,
        existingCollaborators: notes.collaborators || []
      }
    });

    dialogRef.afterClosed().subscribe(updatedCollaborators => {
      if (updatedCollaborators) {
        notes.collaborators = updatedCollaborators;
      }
    });
  }

  openReminderDialog(event: MouseEvent, notes: any) {
    event.stopPropagation();
    const noteId = notes?.notesId;
    if (!noteId) return console.error('Note ID missing');
    const dialogRef = this.dialog.open(ReminderComponent, {
      width: '300px',
      data: {}
    });

    dialogRef.afterClosed().subscribe((result: Date) => {
      if (result) {
        const isoString = result.toISOString();
        this.note.setReminder(noteId, isoString).subscribe({
          next: (response: any) => {
            console.log('Reminder set for:', isoString);
            notes.reminder = isoString;
            
            this.iconstodisplay.emit('refresh');
          },
          error: (err) => console.error('Error setting reminder:', err)
        });
      }
    });
  }
  openAddLabelDialog(event: MouseEvent): void {
    event.stopPropagation();
    
    const dialogRef = this.dialog.open(CreatelabelComponent, {
      width: '300px',
      data: { noteId: this.notesCard?.notesId }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result?.labelName) {
        this.labelService.createLabel(result.labelName).subscribe({
          next: () => {
            this.iconstodisplay.emit('refresh');
          },
          error: (err) => console.error('Error adding label to note:', err)
        });
      }
    });
  }
}