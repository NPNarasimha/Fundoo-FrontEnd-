import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotesService } from '../../services/note/notes.service';

@Component({
  selector: 'app-createnote',
  standalone: false,
  templateUrl: './createnote.component.html',
  styleUrl: './createnote.component.scss'
})
export class CreatenoteComponent implements OnInit {

  notesForm!: FormGroup;
  noteshow: boolean = false; // To toggle between collapsed and expanded note

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.notesForm = this.fb.group({
      title: [''],
      description: ['']
    });
  }

  // Triggered when clicking the collapsed note input
  opennote(): void {
    this.noteshow = true;
  }

  // Close note input without saving
  closeNote(): void {
    this.noteshow = false;
    this.notesForm.reset();
  }

  // On form submission
  onSubmit(): void {
    if (this.notesForm.valid) {
      const noteData = this.notesForm.value;
      console.log('Note Submitted:', noteData);

      // You can send noteData to a service or API here

      this.notesForm.reset();
      this.noteshow = false;
    }
  }
}
