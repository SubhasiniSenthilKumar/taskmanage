import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {


setTheme(theme: string) {
  document.body.classList.remove(
    'theme-morning',
    'theme-afternoon',
    'theme-evening',
    'theme-night'
  );

  document.body.classList.add(theme);
}


  timeBlocks = [
    { start: 6, end: 12, color: '#FFF9C4', emoji: '🌞' },   // Morning
    { start: 12, end: 17, color: '#C8E6C9', emoji: '🌿' },  // Afternoon
    { start: 17, end: 21, color: '#BBDEFB', emoji: '🌊' },  // Evening
    { start: 21, end: 6, color: '#CE93D8', emoji: '🌙' }    // Night
  ];

  getCurrentTheme() {
    const hour = new Date().getHours();
    for (const block of this.timeBlocks) {
      if (block.start < block.end && hour >= block.start && hour < block.end) return block;
      if (block.start > block.end && (hour >= block.start || hour < block.end)) return block;
    }
    return this.timeBlocks[0];
  }
}


