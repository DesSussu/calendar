import { Injectable, inject, signal } from '@angular/core';
import { Database, ref, onValue, push, update, remove } from '@angular/fire/database';
import { Subject } from 'rxjs';

export interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
}

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  private db: Database = inject(Database);
  private events = signal<CalendarEvent[]>([]);
  public events$ = new Subject<void>();

  constructor() {
    this.getEvents();
  }

  getEvents() {
    const eventsRef = ref(this.db, 'events');
    onValue(eventsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const eventsArray = Object.keys(data).map(key => ({
          id: key,
          ...data[key],
          date: new Date(data[key].date)
        }));
        this.events.set(eventsArray);
      } else {
        this.events.set([]);
      }
    });
    return this.events.asReadonly();
  }

  addEvent(event: { title: string; date: Date }) {
    const eventsRef = ref(this.db, 'events');
    const newEventRef = push(eventsRef);
    const newEvent: Omit<CalendarEvent, 'id'> = {
      title: event.title,
      date: event.date
    };
    push(eventsRef, newEvent);
    this.events$.next();
  }

  updateEvent(updatedEvent: CalendarEvent) {
    const eventRef = ref(this.db, `events/${updatedEvent.id}`);
    const eventToUpdate = {
      title: updatedEvent.title,
      date: updatedEvent.date.toISOString() 
    };
    update(eventRef, eventToUpdate);
    this.events$.next();
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    const eventRef = ref(this.db, `events/${eventToDelete.id}`);
    remove(eventRef);
    this.events$.next();
  }
}
