
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CalendarEvent } from '../events.service';

@Component({
  selector: 'app-event-list',
  imports: [CommonModule, MatListModule, MatIconModule, MatButtonModule],
  templateUrl: './event-list.html',
  styleUrl: './event-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventListComponent {
  public events = input.required<CalendarEvent[]>();
  public edit = output<CalendarEvent>();
  public delete = output<CalendarEvent>();
}
