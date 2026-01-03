import { Injectable, signal } from '@angular/core';
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
  private storageKey = 'calendarEvents';
  private events = signal<CalendarEvent[]>([]);
  public events$ = new Subject<void>();

  constructor() {
    this.loadEventsFromStorage();
  }

  getEvents() {
    return this.events.asReadonly();
  }

  addEvent(event: { title: string; date: Date }) {
    const newEvent: CalendarEvent = { ...event, id: Date.now().toString() };
    this.events.update(events => [...events, newEvent]);
    this.saveEvents();
    this.events$.next();
  }

  updateEvent(updatedEvent: CalendarEvent) {
    this.events.update(events =>
      events.map(event => (event.id === updatedEvent.id ? updatedEvent : event))
    );
    this.saveEvents();
    this.events$.next();
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events.update(events => events.filter(event => event.id !== eventToDelete.id));
    this.saveEvents();
    this.events$.next();
  }

  private saveEvents(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.events()));
  }

  private loadEventsFromStorage(): void {
    const storedEvents = localStorage.getItem(this.storageKey);
    if (storedEvents) {
      const parsedEvents = JSON.parse(storedEvents).map((event: any) => ({
        ...event,
        date: new Date(event.date)
      }));
      this.events.set(parsedEvents);
    }
  }
}
