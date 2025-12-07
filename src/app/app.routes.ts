import { Routes } from '@angular/router';
import { ClockDisplayComponent } from './clock-display/clock-display.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { CoinFlipComponent } from './coin-flip/coin-flip.component';
import { ColourDayComponent } from './colour-day/colour-day.component';
import { HabitComponent } from './habit/habit.component';

export const routes: Routes = [
 
  { path: 'emotion-clock', component: ClockDisplayComponent },
  { path: '', component: HomeComponent },
  {path:'coin-flip',component:CoinFlipComponent},
  {path:'colourYourDay',component:ColourDayComponent},
  {path:'habitTree',component:HabitComponent}
];
