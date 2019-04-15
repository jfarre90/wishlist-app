import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WishesDisplayComponent } from './wishes-display.component';

describe('WishesDisplayComponent', () => {
  let component: WishesDisplayComponent;
  let fixture: ComponentFixture<WishesDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WishesDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WishesDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
