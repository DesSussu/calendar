import { Injectable, inject, signal, NgZone } from '@angular/core';
import { Database, ref, onValue, push, update, remove } from '@angular/fire/database';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../environments/environment';

export interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  documents?: { name: string; url: string }[];
}

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  private db: Database = inject(Database);
  private supabase: SupabaseClient;
  private ngZone = inject(NgZone);
  public events = signal<CalendarEvent[]>([]);

  constructor() {
    this.supabase = createClient(environment.supabase.url, environment.supabase.anonKey);
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

  async addEvent(event: { title: string; date: Date; files?: File[] }) {
    const eventsRef = ref(this.db, 'events');
    
    // Upload files to Supabase Storage if any
    const documents: { name: string; url: string }[] = [];
    if (event.files && event.files.length > 0) {
      for (const file of event.files) {
        const timestamp = Date.now();
        const filePath = `events/${timestamp}_${file.name}`;
        
        try {
          const { data, error } = await this.supabase.storage
            .from('calendar-files')
            .upload(filePath, file, { upsert: false });
          
          if (error) throw error;
          
          const { data: urlData } = this.supabase.storage
            .from('calendar-files')
            .getPublicUrl(filePath);
          
          documents.push({ name: file.name, url: urlData.publicUrl });
        } catch (error) {
          console.error('Error uploading file:', error);
        }
      }
    }
    
    const newEvent: any = {
      title: event.title,
      date: event.date.toISOString()
    };
    
    // Only add documents field if there are documents
    if (documents.length > 0) {
      newEvent.documents = documents;
    }
    
    push(eventsRef, newEvent);
  }

  async updateEvent(updatedEvent: CalendarEvent) {
    const eventRef = ref(this.db, `events/${updatedEvent.id}`);
    const eventToUpdate = {
      title: updatedEvent.title,
      date: updatedEvent.date.toISOString(),
      documents: updatedEvent.documents || undefined
    };
    update(eventRef, eventToUpdate);
  }

  async deleteEvent(eventToDelete: CalendarEvent) {
    // Delete documents from Supabase Storage first
    if (eventToDelete.documents && eventToDelete.documents.length > 0) {
      for (const doc of eventToDelete.documents) {
        try {
          // Extract file path from URL
          const urlParts = doc.url.split('/calendar-files/');
          if (urlParts.length > 1) {
            const filePath = urlParts[1];
            await this.supabase.storage
              .from('calendar-files')
              .remove([filePath]);
          }
        } catch (error) {
          console.error('Error deleting file:', error);
        }
      }
    }
    
    // Then delete the event from Database
    const eventRef = ref(this.db, `events/${eventToDelete.id}`);
    remove(eventRef);
  }
}
