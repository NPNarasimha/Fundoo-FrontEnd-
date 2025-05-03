import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotesService } from '../../services/note/notes.service';

@Component({
  selector: 'app-reminder',
  standalone: false,
  templateUrl: './reminder.component.html',
  styleUrl: './reminder.component.scss'
})
export class ReminderComponent {
  reminderDate: Date = new Date();
  reminderTime: string = this.getCurrentTime();
  constructor(private service:NotesService,
    public dialogRef: MatDialogRef<ReminderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

 
  getCurrentTime(): string {
    const now = new Date();
    return now.toTimeString().slice(0, 5);
  }
  saveReminder() {
    const finalReminder = this.combineDateAndTime(this.reminderDate, this.reminderTime);
    this.dialogRef.close(finalReminder); 
  }
  combineDateAndTime(date: Date, time: string): Date {
    const [hours, minutes] = time.split(':').map(Number);
    const updatedDate = new Date(date);
    updatedDate.setHours(hours, minutes, 0, 0);
    return updatedDate;
  }
  close() {
    this.dialogRef.close();
  }
}
