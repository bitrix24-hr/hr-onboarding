import { Component, input } from '@angular/core';

@Component({
  selector: 'app-thankyou',
  standalone: true,
  imports: [],
  templateUrl: './thankyou.html',
  styleUrl: './thankyou.scss',
})
export class Thankyou {
  userName = input<string>('');
}
