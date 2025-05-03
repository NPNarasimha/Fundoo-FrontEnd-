import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { LabelService } from '../../services/label/label.service';

@Component({
  selector: 'app-createlabel',
  standalone: false,
  templateUrl: './createlabel.component.html',
  styleUrl: './createlabel.component.scss'
})
export class CreatelabelComponent implements OnInit{
  labelName: string = '';
  labels: string[] = [];
  showInput: boolean = false;
 
  constructor(
    private dialogRef: MatDialogRef<CreatelabelComponent>,
    private service:LabelService,
    private cdRef:ChangeDetectorRef
  ) {}
  cancelCreate() {
    this.showInput = false;
    this.labelName = '';
  }
  ngOnInit(): void {
    this.fetchAllLabels();
  }

  fetchAllLabels(): void {
    this.service.displayLabels().subscribe({
      next: (response: any) => {
        this.labels = response.labels || []; 
      },
      error: (err) => {
        console.error('Failed to load labels:', err);
      }
    });
  }
  addLabel() {
    if (this.labelName) {
      const payload = { labelName: this.labelName };
      this.service.createLabel(payload).subscribe({
        next: (response) => {
          console.log('Label added:', response);
          this.labels.push(this.labelName);
          this.labelName = '';
          this.showInput = false;
        },
        error: (err) => {
          console.error('Error adding label:', err);
        }
      });
    }
  }
  
  closeDialog() {
    this.dialogRef.close(this.labels);
  }
}
