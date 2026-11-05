import {ComponentFixture, TestBed} from '@angular/core/testing';
import {provideRouter} from '@angular/router';
import {of} from 'rxjs';
import {BranchDirectoryService} from '../../data/services/branch-directory.service';

import {BranchesComponent} from './branches.component';

describe('BranchesComponent', () => {
  let fixture: ComponentFixture<BranchesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BranchesComponent],
      providers: [provideRouter([]), {provide: BranchDirectoryService, useValue: {getBranches: () => of([])}}]
    }).compileComponents();

    fixture = TestBed.createComponent(BranchesComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });
});
