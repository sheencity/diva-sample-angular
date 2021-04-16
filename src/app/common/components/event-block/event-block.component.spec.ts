import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventBlockComponent } from './event-block.component';

describe('EventBlockComponent', () => {
  let component: EventBlockComponent;
  let fixture: ComponentFixture<EventBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventBlockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
