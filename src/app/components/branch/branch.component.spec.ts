import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ActivatedRoute} from '@angular/router';
import {NEVER, of} from 'rxjs';
import {BranchDirectoryService} from '../../data/services/branch-directory.service';

import {BranchComponent} from './branch.component';

describe('BranchComponent', () => {
  let component: BranchComponent;
  let fixture: ComponentFixture<BranchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BranchComponent],
      providers: [
        {provide: ActivatedRoute, useValue: {params: of({id: 'dididi'})}},
        {provide: BranchDirectoryService, useValue: {getBranch: () => NEVER}}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
