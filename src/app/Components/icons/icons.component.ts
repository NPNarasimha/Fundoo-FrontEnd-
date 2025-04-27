import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NotesService } from '../../services/note/notes.service';

@Component({
  selector: 'app-icons',
  standalone: false,
  templateUrl: './icons.component.html',
  styleUrl: './icons.component.scss'
})
export class IconsComponent {
  showPalette: boolean = false;
  colors: string[] = [
    '#f28b82', '#fbbc04', '#fff475',
    '#ccff90', '#a7ffeb', '#cbf0f8', '#aecbfa', '#d7aefb'
  ];
  @ViewChild('noteCard', { static: true }) noteCard!: ElementRef;
  @Output() iconstodisplay = new EventEmitter<any>();
  @Input() notesCard: any;
  selectedcolor:string="";
  isColorPickerVisible: boolean = false;
  constructor(private note:NotesService){}

  toggleColorPicker(event: MouseEvent) {
    event.stopPropagation();  // Prevent click from propagating to document
    this.isColorPickerVisible = !this.isColorPickerVisible;
  }
  toArchive() {
  const noteId =this.notesCard.notesId;
  if (!noteId) {
    console.error('Note ID is missing in notesCard:', this.notesCard);
    return;
  }
  if (this.notesCard.archive) {
    this.note.unarchiveNote(noteId).subscribe({
      next: (response: any) => {
        console.log('Note unarchived:', response);
        this.iconstodisplay.emit(response);
      },
      error: (err) => {
        console.log('Error unarchiving note:', err);
      }
    });
  } else {
    this.note.archiveNote(noteId).subscribe({
      next: (response: any) => {
        console.log('Note archived:', response);
        this.iconstodisplay.emit(response);
      },
      error: (err) => {
        console.log('Error archiving note:', err);
      }
    });
  }
  }
  trash(){
    const noteId =this.notesCard.notesId;
    this.note.trashNote(noteId).subscribe({
      next: (response: any) => {
        console.log('Note trashed:', response);
        this.iconstodisplay.emit(response);
      },
      error: (err) => {
        console.log('Error trash note:', err);
      }
    });
  }
  selectColor(color: string) {
    this.iconstodisplay.emit({ color });
    this.isColorPickerVisible = false;
  }
}