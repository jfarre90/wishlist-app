import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WishesCategoryComponent } from './wishes-category.component';

describe('WishesCategoryComponent', () => {
  let component: WishesCategoryComponent;
  let fixture: ComponentFixture<WishesCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WishesCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WishesCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
