import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MottoComponent } from './motto.component';

describe('MottoComponent', () => {
  let component: MottoComponent;
  let fixture: ComponentFixture<MottoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MottoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MottoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
