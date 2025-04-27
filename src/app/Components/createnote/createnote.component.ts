import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotesService } from '../../services/note/notes.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-createnote',
  standalone: false,
  templateUrl: './createnote.component.html',
  styleUrls: ['./createnote.component.scss']
})
export class CreatenoteComponent implements OnInit {
  notesForm!: FormGroup;
  noteshow: boolean = false;
  submitted = true;
  token:any;

  constructor(
    private formbuilder: FormBuilder,
    private note: NotesService,
    private snackBar: MatSnackBar,
    private activeRoute:ActivatedRoute
  ) {
    this.token = localStorage.getItem('Token');
  }
  ngOnInit(): void {
    this.notesForm = this.formbuilder.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(5)]],
      color:'#ffffff',
      isPin:false 
      ,isArchive:false
    });
  }
  @Output() messageCreateToDisplay = new EventEmitter<string>();
  
  toggleForm(event?: MouseEvent) {
    this.noteshow= true;
    event?.stopPropagation(); 
  }
  opennote(): void {
    this.noteshow = true;
  }
onNoteColorSelected(event: { color: string }): void {
    this.notesForm.get('color')?.setValue(event.color);
  }

  onSubmit(): void {
    this.submitted=true;
    console.log('Form Values:', this.notesForm.value);
    if (this.notesForm.valid) {
      const noteData = {
        Title: this.notesForm.value.title,
        Description: this.notesForm.value.description,
        Color: this.notesForm.value.color,
        isPin: this.notesForm.value.isPin,
        isArchive:this.notesForm.value.isArchive
      };
      console.log(noteData);
      this.note.createNotes(noteData).subscribe({
        next: (result: any) => {
          console.log(result.message);
          this.messageCreateToDisplay.emit(result);
          this.snackBar.open('Notes created successfully!', 'Close', { duration: 3000 });
          this.notesForm.reset({ color: '#ffffff', isPin: false,isArchive:false});
          this.noteshow = false;
        },
        error: (err) => {
          console.error('Error from API:', err);
          this.snackBar.open('Note creation failed. Please try again.', 'Close', { duration: 3000 });
        }
      });

    } else {
      this.noteshow = false;
      this.notesForm.reset({ color: '#ffffff', isPin: false ,isArchive:false});
      this.snackBar.open('Please fill all fields correctly.', 'Close', { duration: 3000 });
    }
  }
}