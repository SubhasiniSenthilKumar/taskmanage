import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule,RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {


  // emoji = "😄";
  // emojiAnimation = "";

  // ngOnInit(): void {
  //   this.animateEmoji();
  // }

  // animateEmoji() {
  //   setInterval(() => {
  //     this.emojiAnimation = 'bounce';
  //     setTimeout(() => this.emojiAnimation = 'blink', 500);
  //     setTimeout(() => this.emojiAnimation = '', 900);
  //   }, 2000);
  // }
   emoji = "😄"; // default
  emojiAnimation = "";

  ngOnInit(): void {
    this.updateEmoji();
    // Update every minute in case user keeps page open
    setInterval(() => this.updateEmoji(), 60000);
    this.animateEmoji();
  }

  // Set emoji based on current time
  updateEmoji() {
    const hour = new Date().getHours();

    if (hour >= 5 && hour < 12) {
      this.emoji = "😄"; // Morning
    } else if (hour >= 12 && hour < 17) {
      this.emoji = "🙂"; // Afternoon
    } else if (hour >= 17 && hour < 21) {
      this.emoji = "😌"; // Evening
    } else {
      this.emoji = "😴"; // Night
    }
  }

  // Emoji bounce + blink animation
  animateEmoji() {
    setInterval(() => {
      this.emojiAnimation = 'bounce';
      setTimeout(() => this.emojiAnimation = 'blink', 500);
      setTimeout(() => this.emojiAnimation = '', 900);
    }, 2000);
  }
}
