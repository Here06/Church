import {TestBed} from '@angular/core/testing';
import {ActivatedRoute} from '@angular/router';
import {firstValueFrom, of} from 'rxjs';
import {BranchDirectoryService, BranchWithPastors} from '../../data/services/branch-directory.service';

import {BranchDetailsComponent} from './branch-details.component';

describe('BranchDetailsComponent', () => {
  const branch: BranchWithPastors = {
    id: 'dididi', name: 'Dididi', region: 'Mutale', status: 'active', serviceTimes: [],
    pastors: [{id: 'p', title: 'Pastor', lastName: 'Madzena', initials: 'VE', displayName: 'Pastor VE Madzena',
      branchId: 'dididi', isLead: true, status: 'active'}]
  };

  function setup(result: BranchWithPastors | null) {
    TestBed.configureTestingModule({
      imports: [BranchDetailsComponent],
      providers: [
        {provide: ActivatedRoute, useValue: {params: of({id: 'dididi'})}},
        {provide: BranchDirectoryService, useValue: {getBranch: () => of(result)}}
      ]
    });
    return TestBed.createComponent(BranchDetailsComponent);
  }

  it('should create', () => {
    expect(setup(branch).componentInstance).toBeTruthy();
  });

  it('resolves a found branch with its pastors', async () => {
    const found = await firstValueFrom(setup(branch).componentInstance.branch$);
    expect((found as BranchWithPastors).pastors[0].displayName).toBe('Pastor VE Madzena');
  });

  it('flags a branch that does not exist', async () => {
    expect(await firstValueFrom(setup(null).componentInstance.branch$)).toBe('not-found');
  });
});
