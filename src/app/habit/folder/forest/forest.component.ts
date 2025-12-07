import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

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
  selector: 'app-forest',
  standalone: true,
  imports:[CommonModule],
  template: `
    <svg width="100%" height="500">
      <ng-container *ngFor="let tree of trees; let i=index">
        <g [attr.transform]="'translate(' + (i*200+80) + ',400)'" (click)="treeClicked(i)" style="cursor:pointer">

          <!-- Trunk -->
          <path class="trunk" d="M0,0 C5,-50 5,-100 0,-150" stroke="#8B5A2B" stroke-width="12" fill="none"></path>

          <!-- Leaves -->
          <ng-container *ngFor="let leaf of tree.leaves; let j=index">
            <g>
              <ellipse [attr.cx]="leaf.x" [attr.cy]="leaf.y" [attr.rx]="leaf.rx" [attr.ry]="leaf.ry"
                       [attr.fill]="getColor(leaf.status)" class="leaf">
              </ellipse>
              <title>{{ leaf.date }}</title>
              <text [attr.x]="leaf.x" [attr.y]="leaf.y+4" text-anchor="middle" font-size="8"
                    font-family="sans-serif" fill="#fff">{{ j+1 }}</text>
            </g>
          </ng-container>

          <!-- Habit name -->
          <text text-anchor="middle" font-size="14" font-family="cursive" fill="#2E8B57"
                [attr.y]="-160" style="pointer-events:none; font-weight:bold;" class="habit-name">
            {{ tree.name }}
          </text>
        </g>
      </ng-container>
    </svg>

    <style>
      .trunk { stroke-dasharray: 300; stroke-dashoffset: 300; animation: draw 1.5s forwards ease-out; }
      @keyframes draw { to { stroke-dashoffset:0; } }

      .leaf { transform-origin: center; transform-box: fill-box; transform: scale(0); animation: leafGrow 0.8s forwards ease-out; }
      @keyframes leafGrow { to { transform: scale(1); } }

      .habit-name { animation: sway 2s infinite alternate ease-in-out; }
      @keyframes sway { 0% { transform: translateX(0); } 100% { transform: translateX(3px); } }
    </style>
  `
})
export class ForestComponent {
  @Input() trees: HabitTree[] = [];
  @Output() treeClickedEvent = new EventEmitter<{ treeIndex: number }>();

  treeClicked(treeIndex: number) {
    this.treeClickedEvent.emit({ treeIndex });
  }

  getColor(status: string) {
    switch(status) {
      case 'done': return 'green';
      case 'partial': return 'yellow';
      case 'missed': return 'brown';
      default: return 'gray';
    }
  }
}
