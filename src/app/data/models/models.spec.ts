import {Timestamp} from '@angular/fire/firestore';
import {parseAll} from './firestore-values';
import {parseBranch} from './branch.model';
import {parsePastor} from './pastor.model';
import {parseChurchEvent, venueLabel, VENUE_TBD_LABEL} from './church-event.model';
import {documentUrl, parseChurchDocument} from './church-document.model';
import {isCurrent, parseAnnouncement} from './announcement.model';

const ts = (iso: string) => Timestamp.fromDate(new Date(iso));

describe('parseBranch', () => {
  it('parses a minimal branch and defaults status/serviceTimes', () => {
    const b = parseBranch('budeli', {name: 'Budeli', region: 'Thohoyandou'})!;
    expect(b).toEqual(jasmine.objectContaining({id: 'budeli', name: 'Budeli', region: 'Thohoyandou', status: 'active', serviceTimes: []}));
  });

  it('keeps valid service times and drops incomplete ones', () => {
    const b = parseBranch('x', {name: 'X', region: 'R', serviceTimes: [{day: 'Sunday', time: '09:00'}, {day: 'Monday'}]})!;
    expect(b.serviceTimes).toEqual([{day: 'Sunday', time: '09:00', label: undefined}]);
  });

  it('rejects a branch without name or region', () => {
    expect(parseBranch('x', {name: 'X'})).toBeNull();
    expect(parseBranch('x', {region: 'R'})).toBeNull();
  });
});

describe('parsePastor', () => {
  it('builds a display name and marks pastors without a branch as unassigned', () => {
    const p = parsePastor('a', {title: 'Pastor', initials: 'AJ', lastName: 'Tshabuse'})!;
    expect(p.displayName).toBe('Pastor AJ Tshabuse');
    expect(p.branchId).toBeNull();
    expect(p.status).toBe('unassigned');
    expect(p.isLead).toBeFalse();
  });

  it('never exposes contact information', () => {
    const p = parsePastor('a', {title: 'Pastor', lastName: 'T', branchId: 'b', email: 'x@y.z', contact: '012'})!;
    expect(Object.keys(p)).not.toContain('email');
    expect(Object.keys(p)).not.toContain('contact');
    expect(p.status).toBe('active');
  });
});

describe('parseChurchEvent', () => {
  const base = {name: 'Programme Meeting', type: 'general', start: ts('2026-05-03T00:00:00Z'), status: 'published'};

  it('resolves branch, custom and TBD venues', () => {
    expect(parseChurchEvent('e', {...base, venueType: 'branch', branchId: 'dididi'})!.venue).toEqual({kind: 'branch', branchId: 'dididi'});
    expect(parseChurchEvent('e', {...base, venueType: 'custom', venueText: 'Tshinaki Resort'})!.venue).toEqual({kind: 'custom', text: 'Tshinaki Resort'});
    expect(parseChurchEvent('e', {...base, venueType: 'tbd'})!.venue).toEqual({kind: 'tbd'});
    expect(parseChurchEvent('e', base)!.venue).toEqual({kind: 'tbd'});
  });

  it('falls back to TBD when a branch venue has no branchId', () => {
    expect(parseChurchEvent('e', {...base, venueType: 'branch'})!.venue).toEqual({kind: 'tbd'});
  });

  it('carries the optional flyer document id and allDay flag', () => {
    const e = parseChurchEvent('e', {...base, documentId: 'flyer-1', allDay: true})!;
    expect(e.documentId).toBe('flyer-1');
    expect(e.allDay).toBeTrue();
  });

  it('rejects events without a start or with an unknown type', () => {
    expect(parseChurchEvent('e', {name: 'x', type: 'general'})).toBeNull();
    expect(parseChurchEvent('e', {...base, type: 'Sunday School'})).toBeNull();
  });

  it('treats documents without a status as drafts', () => {
    expect(parseChurchEvent('e', {name: 'x', type: 'men', start: ts('2026-01-01T00:00:00Z')})!.status).toBe('draft');
  });
});

describe('venueLabel', () => {
  const names = new Map([['dididi', 'Dididi']]);
  it('formats each venue kind', () => {
    expect(venueLabel({kind: 'branch', branchId: 'dididi'}, names)).toBe('Dididi');
    expect(venueLabel({kind: 'branch', branchId: 'gone'}, names)).toBe('Unknown branch');
    expect(venueLabel({kind: 'custom', text: 'City Hall'}, names)).toBe('City Hall');
    expect(venueLabel({kind: 'tbd'}, names)).toBe(VENUE_TBD_LABEL);
    expect(VENUE_TBD_LABEL).toBe('To Be Announced');
  });
});

describe('documents', () => {
  const data = {title: 'Constitution', category: 'constitution', source: {type: 'asset', path: 'assets/documents/constitution.pdf'}};

  it('parses metadata and defaults content type and visibility', () => {
    const d = parseChurchDocument('c', data)!;
    expect(d.contentType).toBe('application/pdf');
    expect(d.visibility).toBe('public');
  });

  it('serves asset documents and defers storage documents', () => {
    expect(documentUrl(parseChurchDocument('c', data)!)).toBe('assets/documents/constitution.pdf');
    expect(documentUrl(parseChurchDocument('c', {...data, source: {type: 'storage', path: 'documents/a.pdf'}})!)).toBeNull();
  });

  it('rejects a document without a source', () => {
    expect(parseChurchDocument('c', {title: 'x'})).toBeNull();
  });
});

describe('announcements', () => {
  const data = {title: 'T', body: 'B', status: 'published', publishAt: ts('2026-01-01T00:00:00Z')};

  it('defaults the audience to everyone', () => {
    expect(parseAnnouncement('a', data)!.audience).toEqual({all: true});
    expect(parseAnnouncement('a', {...data, audience: {branchIds: ['b']}})!.audience).toEqual({branchIds: ['b']});
  });

  it('is current only inside its publish window', () => {
    const a = parseAnnouncement('a', {...data, expiresAt: ts('2026-02-01T00:00:00Z')})!;
    expect(isCurrent(a, new Date('2025-12-31'))).toBeFalse();
    expect(isCurrent(a, new Date('2026-01-15'))).toBeTrue();
    expect(isCurrent(a, new Date('2026-03-01'))).toBeFalse();
  });
});

describe('parseAll', () => {
  it('skips invalid documents instead of failing', () => {
    spyOn(console, 'warn');
    const out = parseAll([{id: 'a', name: 'A', region: 'R'}, {id: 'b'}], parseBranch, 'branches');
    expect(out.map(b => b.id)).toEqual(['a']);
    expect(console.warn).toHaveBeenCalledTimes(1);
  });
});
