import { Injectable, inject, signal, NgZone } from '@angular/core';
import { Database, ref, onValue, push, update, remove } from '@angular/fire/database';

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
  private ngZone = inject(NgZone);
  public events = signal<CalendarEvent[]>([]);

  constructor() {
    this.loadEvents();
  }

  private loadEvents() {
    const eventsRef = ref(this.db, 'events');
    onValue(eventsRef, (snapshot) => {
      this.ngZone.run(() => {
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
    });
  }

  addEvent(event: { title: string; date: Date }) {
    const eventsRef = ref(this.db, 'events');
    const newEvent = {
      title: event.title,
      date: event.date.toISOString()
    };
    push(eventsRef, newEvent);
  }

  updateEvent(updatedEvent: CalendarEvent) {
    const eventRef = ref(this.db, `events/${updatedEvent.id}`);
    const eventToUpdate = {
      title: updatedEvent.title,
      date: updatedEvent.date.toISOString() 
    };
    update(eventRef, eventToUpdate);
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    const eventRef = ref(this.db, `events/${eventToDelete.id}`);
    remove(eventRef);
  }
}
