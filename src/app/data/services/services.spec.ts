import {Branch} from '../models/branch.model';
import {Pastor} from '../models/pastor.model';
import {ChurchEvent} from '../models/church-event.model';
import {Announcement} from '../models/announcement.model';
import {attachPastors, sortPastors} from './branch-directory.service';
import {toEventViews} from './events-calendar.service';
import {currentAnnouncements} from './announcements.service';

const branch = (id: string, over: Partial<Branch> = {}): Branch =>
  ({id, name: id, region: 'R', status: 'active', serviceTimes: [], ...over});
const pastor = (id: string, over: Partial<Pastor> = {}): Pastor =>
  ({id, title: 'Pastor', lastName: id, initials: '', displayName: id, branchId: null, isLead: false, status: 'active', ...over});

describe('attachPastors', () => {
  it('lists several pastors per branch, lead first, and ignores inactive branches', () => {
    const result = attachPastors(
      [branch('a'), branch('b', {status: 'inactive'}), branch('c')],
      [pastor('Zulu', {branchId: 'a'}), pastor('Mkhize', {branchId: 'a', isLead: true}), pastor('Adams', {branchId: 'a'})]
    );
    expect(result.map(b => b.id)).toEqual(['a', 'c']);
    expect(result[0].pastors.map(p => p.id)).toEqual(['Mkhize', 'Adams', 'Zulu']);
    expect(result[1].pastors).toEqual([]);
  });

  it('skips unassigned and inactive pastors', () => {
    const [a] = attachPastors([branch('a')], [pastor('p1'), pastor('p2', {branchId: 'a', status: 'inactive'})]);
    expect(a.pastors).toEqual([]);
  });

  it('sortPastors does not mutate its input', () => {
    const input = [pastor('B'), pastor('A', {isLead: true})];
    sortPastors(input);
    expect(input.map(p => p.id)).toEqual(['B', 'A']);
  });
});

describe('toEventViews', () => {
  it('adds a venue label for branch, custom and TBD events', () => {
    const base = {name: 'E', type: 'general' as const, start: new Date(), allDay: false, status: 'published' as const};
    const events: ChurchEvent[] = [
      {...base, id: '1', venue: {kind: 'branch', branchId: 'a'}},
      {...base, id: '2', venue: {kind: 'custom', text: 'Resort'}},
      {...base, id: '3', venue: {kind: 'tbd'}}
    ];
    expect(toEventViews(events, new Map([['a', 'Alpha']])).map(e => e.venueLabel)).toEqual(['Alpha', 'Resort', 'To Be Announced']);
  });
});

describe('currentAnnouncements', () => {
  const a = (id: string, over: Partial<Announcement> = {}): Announcement => ({
    id, title: id, body: 'b', status: 'published', publishAt: new Date('2026-01-01'), pinned: false,
    audience: {all: true}, attachmentDocIds: [], ...over
  });
  const now = new Date('2026-06-01');

  it('orders pinned first then newest, and hides drafts and expired items', () => {
    const result = currentAnnouncements([
      a('old', {publishAt: new Date('2026-02-01')}),
      a('new', {publishAt: new Date('2026-05-01')}),
      a('pinned', {pinned: true, publishAt: new Date('2026-01-01')}),
      a('draft', {status: 'draft'}),
      a('expired', {expiresAt: new Date('2026-03-01')})
    ], now);
    expect(result.map(x => x.id)).toEqual(['pinned', 'new', 'old']);
  });

  it('filters by branch audience', () => {
    const result = currentAnnouncements([
      a('everyone'), a('mine', {audience: {branchIds: ['x']}}), a('theirs', {audience: {branchIds: ['y']}})
    ], now, 'x');
    expect(result.map(x => x.id).sort()).toEqual(['everyone', 'mine']);
  });
});
