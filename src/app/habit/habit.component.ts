import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ForestComponent } from './folder/forest/forest.component';
import { CommonModule } from '@angular/common';

interface Leaf {
  x: number;
  y: number;
  rx: number;
  ry: number;
  status: 'done' | 'partial' | 'missed';
  date: string;
}

interface HabitTree {
  name: string;
  leaves: Leaf[];
  lastUpdated: string | null;
}

@Component({
  selector: 'app-habit',
  standalone: true,
  imports: [FormsModule, ForestComponent, CommonModule],
  template: `  
 <div class="habit-card">
      <div class="habit-icon">🌱</div>
      <input type="text" [(ngModel)]="newHabitName" placeholder="Enter a new habit" class="habit-input">
      <button (click)="addHabit()" class="habit-btn">Add</button>
    </div>

    <h2 style="text-align:center">🌳 My Habit Forest 🌳</h2>

    <app-forest [trees]="habitTrees" (treeClickedEvent)="markHabitDone($event)"></app-forest>
  `
  ,
  styles: [`
    .habit-card {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      background: linear-gradient(145deg, #f0fff4, #e6ffe6);
      padding: 1rem 1.5rem;
      border-radius: 20px;
      box-shadow: 0 8px 15px rgba(46, 139, 87, 0.2);
      justify-content: center;
      flex-wrap: wrap;
      max-width: 400px;
      margin: 0 auto 2rem auto;
      transition: transform 0.3s ease;
    }

    .habit-card:hover {
      transform: translateY(-3px);
      box-shadow: 0 12px 20px rgba(46, 139, 87, 0.3);
    }

    .habit-icon {
      font-size: 1.8rem;
    }

    .habit-input {
      padding: 0.5rem 1rem;
      border-radius: 25px;
      border: 1px solid #a0d3a2;
      font-size: 1rem;
      width: 200px;
      transition: all 0.3s ease;
      outline: none;
    }

    .habit-input:focus {
      border-color: #2e8b57;
      box-shadow: 0 0 8px rgba(46, 139, 87, 0.3);
    }

    .habit-btn {
      padding: 0.5rem 1.5rem;
      background: linear-gradient(135deg, #6bbf59, #2e8b57);
      border: none;
      border-radius: 25px;
      color: #fff;
      font-weight: bold;
      cursor: pointer;
      font-size: 1rem;
      transition: all 0.3s ease;
    }

    .habit-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(46, 139, 87, 0.4);
    }
  `]
})
export class HabitComponent {
  newHabitName = '';

  habitTrees: HabitTree[] = [];

  constructor() {
    this.loadFromLocalStorage();

    // Initialize some example habits if localStorage empty
    if (!this.habitTrees.length) {
      this.habitTrees = [
        { name: 'Morning Exercise', leaves: [], lastUpdated: null },
        { name: 'Meditation', leaves: [], lastUpdated: null }
      ];
    }
  }

  addHabit() {
    if (!this.newHabitName.trim()) return;
    this.habitTrees.push({ name: this.newHabitName, leaves: [], lastUpdated: null });
    this.newHabitName = '';
    this.saveToLocalStorage();
  }

  markHabitDone(event: { treeIndex: number }) {
    const tree = this.habitTrees[event.treeIndex];
    const today = new Date();
    const todayStr = today.toDateString();

    // Check if today's leaf exists
    let todayLeaf = tree.leaves.find(l => l.date === todayStr);

    if (todayLeaf) {
      // If it's partial (yellow), mark as done
      if (todayLeaf.status === 'partial') todayLeaf.status = 'done';
      this.saveToLocalStorage();
      return; // already done
    }

    // Detect yesterday missed day → yellow leaf
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    const yesterdayStr = yesterday.toDateString();
    if (tree.lastUpdated && tree.lastUpdated !== yesterdayStr) {
      tree.leaves.push({
        x: -20,
        y: -80,
        rx: 6,
        ry: 8,
        status: 'partial', // yellow
        date: yesterdayStr
      });
    }

    // Add today's leaf → done (green)
    const leafCount = tree.leaves.length;
    tree.leaves.push({
      x: -20 + leafCount * 10 + Math.random() * 10,
      y: -80 - leafCount * 5 + Math.random() * 5,
      rx: 6 + Math.random() * 2,
      ry: 8 + Math.random() * 2,
      status: 'done',
      date: todayStr
    });

    tree.lastUpdated = todayStr;
    this.saveToLocalStorage();
  }

  saveToLocalStorage() {
    localStorage.setItem('habitTrees', JSON.stringify(this.habitTrees));
  }

  loadFromLocalStorage() {
    const data = localStorage.getItem('habitTrees');
    if (data) this.habitTrees = JSON.parse(data);
  }
}
