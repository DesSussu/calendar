
import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { EventsService, CalendarEvent } from '../events.service';
import { EventFormComponent } from '../event-form/event-form.component';
import { EventListComponent } from '../event-list/event-list';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

interface Day {
  dayOfMonth: number;
  month: number;
  year: number;
  events: CalendarEvent[];
}

@Component({
  selector: 'app-calendar',
  imports: [
    CommonModule, 
    MatDialogModule, 
    EventListComponent, 
    MatButtonModule, 
    MatIconModule
  ],
  styleUrl: './calendar.scss',
  templateUrl: './calendar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      transition(':enter, :leave', [
        animate(300)
      ]),
    ]),
  ]
})
export class CalendarComponent {
  private dialog = inject(MatDialog);
  private eventsService = inject(EventsService);

  public year = signal(new Date().getFullYear());
  public months: { name: string; days: Day[] }[] = [];
  public selectedDay = signal<Day | null>(null);
  
  public selectedDayEvents = computed(() => {
    const day = this.selectedDay();
    const allEvents = this.eventsService.events();
    if (!day) return [];
    const selectedDate = new Date(day.year, day.month, day.dayOfMonth);
    return allEvents.filter(e => new Date(e.date).toDateString() === selectedDate.toDateString());
  });

  constructor() {
    this.generateCalendar();
    effect(() => {
      this.eventsService.events();
      this.generateCalendar();
    });
  }

  public changeYear(delta: number): void {
    this.year.update(year => year + delta);
    this.generateCalendar();
    this.selectedDay.set(null);
  }

  public selectDay(day: Day): void {
    this.selectedDay.set(day);
  }

  public isDaySelected(day: Day): boolean {
    const selected = this.selectedDay();
    return selected?.dayOfMonth === day.dayOfMonth && 
           selected?.month === day.month && 
           selected?.year === day.year;
  }

  public addEvent(): void {
    const day = this.selectedDay();
    if (!day) return;

    const dialogRef = this.dialog.open(EventFormComponent, {
      width: '400px',
      data: { date: new Date(day.year, day.month, day.dayOfMonth) }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.eventsService.addEvent(result);
      }
    });
  }

  public handleEditEvent(event: CalendarEvent): void {
    const dialogRef = this.dialog.open(EventFormComponent, {
      width: '400px',
      data: { date: new Date(event.date), event: event }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const updatedEvent: CalendarEvent = { ...event, ...result };
        this.eventsService.updateEvent(updatedEvent);
      }
    });
  }

  public handleDeleteEvent(event: CalendarEvent): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.eventsService.deleteEvent(event);
      }
    });
  }

  private generateCalendar(): void {
    const year = this.year();
    const monthNames = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    const allEvents = this.eventsService.events();

    this.months = monthNames.map((name, index) => {
      const monthIndex = index;
      const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
      const days: Day[] = [];

      for (let i = 1; i <= daysInMonth; i++) {
        const date = new Date(year, monthIndex, i);
        const dayEvents = allEvents.filter(e => 
          new Date(e.date).toDateString() === date.toDateString()
        );
        days.push({ dayOfMonth: i, month: monthIndex, year: year, events: dayEvents });
      }

      return { name, days };
    });
  }
}
