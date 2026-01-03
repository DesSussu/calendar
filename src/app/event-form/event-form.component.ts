
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CalendarEvent } from '../events.service';

@Component({
  selector: 'app-event-form',
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventFormComponent {
  private fb = inject(FormBuilder);
  public dialogRef = inject(MatDialogRef<EventFormComponent>);
  public data: { date: Date, event?: CalendarEvent } = inject(MAT_DIALOG_DATA);

  public eventForm = this.fb.group({
    title: [this.data.event?.title || '', Validators.required]
  });

  public save(): void {
    if (this.eventForm.valid) {
        this.dialogRef.close({ title: this.eventForm.value.title });
    }
  }

  public cancel(): void {
    this.dialogRef.close();
  }
}
