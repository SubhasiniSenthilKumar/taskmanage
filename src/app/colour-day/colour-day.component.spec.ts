import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColourDayComponent } from './colour-day.component';

describe('ColourDayComponent', () => {
  let component: ColourDayComponent;
  let fixture: ComponentFixture<ColourDayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColourDayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColourDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
