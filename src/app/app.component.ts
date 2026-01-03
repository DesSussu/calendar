import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CalendarComponent } from './calendar/calendar.component';

@Component({
  selector: 'app-root',
  imports: [CalendarComponent],
  template: `
    <main class="container">
      <app-calendar></app-calendar>
    </main>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}