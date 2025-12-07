import { Component, Input, OnInit } from '@angular/core';
import { ThemeService } from '../services/theme.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-clock-display',
  imports: [CommonModule],
  templateUrl: './clock-display.component.html',
  styleUrl: './clock-display.component.css'
})
export class ClockDisplayComponent implements OnInit{




  time: Date = new Date();
  @Input() emoji: string = '🌞';

  constructor(private themeService: ThemeService){}

  // ngOnInit() {
  //   setInterval(() => {
  //     this.time = new Date();
  //   }, 1000);
  // }

  message = '';

  hourDeg = '';
  minDeg = '';
  secDeg = '';

 

  ngOnInit(): void {
    this.updateClock();
    setInterval(() => this.updateClock(), 1000);
  }

  updateClock() {
    const now = new Date();
    const hr = now.getHours();
    const min = now.getMinutes();
    const sec = now.getSeconds();

    // Analog clock rotation
    this.hourDeg = `rotate(${(hr % 12) * 30 + min * 0.5}deg)`;
    this.minDeg = `rotate(${min * 6}deg)`;
    this.secDeg = `rotate(${sec * 6}deg)`;

    // Emoji + theme logic
    if (hr >= 5 && hr < 12) {
      this.emoji = '😄';
      this.message = 'Good Morning!';
      this.themeService.setTheme('theme-morning');

    } else if (hr >= 12 && hr < 17) {
      this.emoji = '🙂';
      this.message = 'Good Afternoon!';
      this.themeService.setTheme('theme-afternoon');

    } else if (hr >= 17 && hr < 21) {
      this.emoji = '😌';
      this.message = 'Good Evening!';
      this.themeService.setTheme('theme-evening');

    } else {
      this.emoji = '😴';
      this.message = 'Good Night!';
      this.themeService.setTheme('theme-night');
    }
  }
}

