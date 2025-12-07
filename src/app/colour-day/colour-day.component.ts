import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
// Angular Material modules
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';

interface Day {
  date: number;
 mood?: string; // selected emoji
}
@Component({
  selector: 'app-colour-day',
  imports: [CommonModule,MatCardModule,MatIconModule,MatGridListModule,MatButtonModule],
  templateUrl: './colour-day.component.html',
  styleUrl: './colour-day.component.css'
})






export class ColourDayComponent implements OnInit {

  @ViewChild('colorPicker') colorPicker!: ElementRef;

  days: Day[] = [];
    selectedDay!: Day;

  currentDate: Date = new Date();
  monthName: string = '';
  dayNames: string[] = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
showMoodPalette = false;

  // Hardcoded emojis for all expressions
  moods = ['😀','😃','😄','😁','😆','😅','😂','🤣','😊','😇','🙂','🙃','😉',
           '😌','😍','🥰','😘','😗','😙','😚','😋','😛','😝','😜','🤪','🤨',
           '🧐','🤓','😎','🥳','😏','😒','😞','😔','😟','😕','🙁','☹️','😣',
           '😖','😫','😩','🥺','😢','😭','😤','😠','😡','🤬','🤯','😳','🥵',
           '🥶','😱','😨','😰','😥','😓','🤗','🤔','🤭','🤫','🤥','😶','😐','😑','😬','🙄','😯','😦','😧','😮','😲','🥱','😴','🤤','😪','😵','🤐','🥴','🤢','🤮','🤧','😷','🤒','🤕','🤑'];

  ngOnInit(): void {
    this.generateMonth(this.currentDate);
  }

 generateMonth(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  this.monthName = date.toLocaleString('default', { month: 'long', year: 'numeric' });

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay(); // 0=Sun, 1=Mon, ...

  this.days = [];


 for (let i = 0; i < firstDay; i++) {
      this.days.push({ date: 0 });
    }
  // Add actual days
  for (let i = 1; i <= daysInMonth; i++) {
    this.days.push({ date: i });
  }
    this.loadMoods();
}


  prevMonth() {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1, 1);
    this.generateMonth(this.currentDate);
  }

  nextMonth() {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 1);
    this.generateMonth(this.currentDate);
  }
  showEmojiPicker = false;
pickMood(day: Day) {
    if(day.date === 0) return;
    this.selectedDay = day;
    this.showMoodPalette = true;
  }

  selectMood(mood: string) {
    if(this.selectedDay) {
      this.selectedDay.mood = mood;
      this.showMoodPalette = false;
      this.saveMoods(); // <- ADD THIS
    }
  }

  cancelMood() {
    this.showMoodPalette = false;
  }

  saveMoods() {
    const key = this.getStorageKey();
    // Only save days that have a mood
    const moodsToSave = this.days
      .filter(day => day.date !== 0 && day.mood)
      .map(day => ({ date: day.date, mood: day.mood }));
    localStorage.setItem(key, JSON.stringify(moodsToSave));
  }

  loadMoods() {
    const key = this.getStorageKey();
    const saved = localStorage.getItem(key);
    if (!saved) return;

    const moods = JSON.parse(saved) as { date: number, mood: string }[];
    moods.forEach(savedDay => {
      const day = this.days.find(d => d.date === savedDay.date);
      if (day) day.mood = savedDay.mood;
    });
  }

  getStorageKey(): string {
    // Unique key per month/year
    return `calendar-${this.currentDate.getFullYear()}-${this.currentDate.getMonth()}`;
  }
}


