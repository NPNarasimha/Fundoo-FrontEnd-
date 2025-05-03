import { Component, Inject ,ChangeDetectorRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CollabratorService } from '../../services/collabrator/collabrator.service';
interface Collaborator {
  email: string;
  collabId?: number;
}
@Component({
  selector: 'app-collaborator',
  standalone: false,
  templateUrl: './collaborator.component.html',
  styleUrl: './collaborator.component.scss'
})
export class CollaboratorComponent  {
  email: string = '';
  collaborators: Collaborator[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { noteId: number; existingCollaborators: Collaborator[] },
    private dialogRef: MatDialogRef<CollaboratorComponent>,
    private service: CollabratorService,
    private snackBar: MatSnackBar,
    private cdRef: ChangeDetectorRef
  ) {
    this.collaborators = [...data.existingCollaborators]; // Preload if any
  }

  addcollaborator(): void {
    const email = this.email.trim();
    if (!email) return;

    this.service.addCollaborator(this.data.noteId, email).subscribe({
      next: (response) => {
        this.collaborators.push({ email });
        this.snackBar.open('Collaborator added', 'Close', { duration: 2000 });
        this.email = '';
        this.cdRef.detectChanges();
      },
      error: () => {
        this.snackBar.open('Failed to add collaborator', 'Close', { duration: 2000 });
      }
    });
  }

  removeCollaborator(collaborator: Collaborator): void {
    if (collaborator.collabId) {
      this.service.removeCollaborator(collaborator.collabId).subscribe({
        next: () => {
          this.collaborators = this.collaborators.filter(c => c.collabId !== collaborator.collabId);
          this.cdRef.detectChanges();
        },
        error: () => {
          this.snackBar.open('Failed to remove collaborator', 'Close', { duration: 2000 });
        }
      });
    } else {
      this.collaborators = this.collaborators.filter(c => c.email !== collaborator.email);
    }
  }

  close(): void {
    this.dialogRef.close(this.collaborators); // Return collaborators to parent
  }
}