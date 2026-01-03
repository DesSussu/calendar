
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { CalendarEvent } from '../events.service';

@Component({
  selector: 'app-event-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventFormComponent {
  private fb = inject(FormBuilder);
  public dialogRef = inject(MatDialogRef<EventFormComponent>);
  public data: { date: Date, event?: CalendarEvent } = inject(MAT_DIALOG_DATA);
  public selectedFiles = signal<File[]>([]);

  public eventForm = this.fb.group({
    title: [this.data.event?.title || '', Validators.required]
  });

  public onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const newFiles = Array.from(input.files);
      this.selectedFiles.update(files => [...files, ...newFiles]);
    }
  }

  public removeFile(index: number): void {
    this.selectedFiles.update(files => files.filter((_, i) => i !== index));
  }

  public save(): void {
    if (this.eventForm.valid) {
        this.dialogRef.close({ 
          title: this.eventForm.value.title,
          date: this.data.date,
          files: this.selectedFiles()
        });
    }
  }

  public cancel(): void {
    this.dialogRef.close();
  }
}
