import {DocumentData} from '@angular/fire/firestore';
import {asBoolean, asContentStatus, asString, ContentStatus, toDate} from './firestore-values';

export const EVENT_TYPES = ['general', 'men', 'women', 'youth', 'sundaySchool', 'branch'] as const;
export type EventType = (typeof EVENT_TYPES)[number];

export const EVENT_TYPE_LABELS: Record<EventType, string> = {
  general: 'General',
  men: 'Men',
  women: 'Women',
  youth: 'Youth',
  sundaySchool: 'Sunday School',
  branch: 'Branch'
};

export const isEventType = (value: unknown): value is EventType =>
  typeof value === 'string' && (EVENT_TYPES as readonly string[]).includes(value);

/** Where an event is held. `tbd` is shown as "To Be Announced". */
export type EventVenue =
  | {kind: 'branch'; branchId: string}
  | {kind: 'custom'; text: string}
  | {kind: 'tbd'};

export const VENUE_TBD_LABEL = 'To Be Announced';

/** `events/{yyyy-mm-dd-slug}` */
export interface ChurchEvent {
  id: string;
  name: string;
  type: EventType;
  start: Date;
  end?: Date;
  allDay: boolean;
  venue: EventVenue;
  /** ID of a `documents/{id}` entry, e.g. the event flyer. */
  documentId?: string;
  description?: string;
  status: ContentStatus;
}

export function parseChurchEvent(id: string, data: DocumentData): ChurchEvent | null {
  const name = asString(data['name']);
  const start = toDate(data['start']);
  const type = data['type'];
  if (!name || !start || !isEventType(type)) {
    return null;
  }

  const branchId = asString(data['branchId']);
  const venueText = asString(data['venueText']);
  const venue: EventVenue =
    data['venueType'] === 'branch' && branchId ? {kind: 'branch', branchId} :
    data['venueType'] === 'custom' && venueText ? {kind: 'custom', text: venueText} :
    {kind: 'tbd'};

  return {
    id,
    name,
    type,
    start,
    end: toDate(data['end']),
    allDay: asBoolean(data['allDay']),
    venue,
    documentId: asString(data['documentId']),
    description: asString(data['description']),
    status: asContentStatus(data['status'])
  };
}

/** Human-readable venue; `branchNames` maps branch id to name. */
export function venueLabel(venue: EventVenue, branchNames: ReadonlyMap<string, string>): string {
  switch (venue.kind) {
    case 'branch':
      return branchNames.get(venue.branchId) ?? 'Unknown branch';
    case 'custom':
      return venue.text;
    default:
      return VENUE_TBD_LABEL;
  }
}
