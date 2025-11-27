import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PastorDetailsComponent } from './pastor-details.component';

describe('PastorDetailsComponent', () => {
  let component: PastorDetailsComponent;
  let fixture: ComponentFixture<PastorDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PastorDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PastorDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
