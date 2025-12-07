import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-coin-flip',
  imports: [CommonModule],
  templateUrl: './coin-flip.component.html',
  styleUrl: './coin-flip.component.css'
})
export class CoinFlipComponent {

  coinResult: string = '';
  story: string[] = [];
  spinning: boolean = false;

  headsStories: string[] = [
    'You enter a magical forest and hear birds singing.',
    'You find a sparkling river flowing gently.',
    'A wise old owl watches you from a tree.'
  ];

  tailsStories: string[] = [
    'You walk into a village and meet a mysterious merchant.',
    'You stumble upon a hidden market full of wonders.',
    'A sudden fog surrounds you, hiding the path ahead.'
  ];

  randomEvents: string[] = [
    'A talking cat joins your adventure!',
    'A sudden storm appears!',
    'You find a mysterious key on the ground.'
  ];

  flipCoin() {
    if (this.spinning) return; // prevent multiple flips at once
    this.spinning = true;
    this.coinResult = '';
    
    // Animate coin for 1s
    setTimeout(() => {
      this.spinning = false;
      this.coinResult = Math.random() < 0.5 ? 'Heads' : 'Tails';

      let segment = this.coinResult === 'Heads'
        ? this.headsStories[Math.floor(Math.random() * this.headsStories.length)]
        : this.tailsStories[Math.floor(Math.random() * this.tailsStories.length)];

      this.story.unshift(`Coin: ${this.coinResult} → ${segment}`);

      if (Math.random() < 0.3) {
        let event = this.randomEvents[Math.floor(Math.random() * this.randomEvents.length)];
        this.story.unshift(`Event: ${event}`);
      }
    }, 1000);
  }

  resetStory() {
    this.story = [];
    this.coinResult = '';
  }


}
