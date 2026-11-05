import {DocumentData} from '@angular/fire/firestore';
import {asBoolean, asString} from './firestore-values';

export type PastorStatus = 'active' | 'unassigned' | 'inactive';

/**
 * `pastors/{slug}` - a church may have several pastors, a pastor belongs to at most one church.
 * The link is stored here (`branchId`) only; there is deliberately no contact information.
 */
export interface Pastor {
  id: string;
  title: string;
  firstName?: string;
  lastName: string;
  initials: string;
  displayName: string;
  branchId: string | null;
  isLead: boolean;
  status: PastorStatus;
}

export function parsePastor(id: string, data: DocumentData): Pastor | null {
  const lastName = asString(data['lastName']);
  const title = asString(data['title']);
  if (!lastName || !title) {
    return null;
  }
  const initials = asString(data['initials']) ?? '';
  const firstName = asString(data['firstName']);
  const branchId = asString(data['branchId']) ?? null;

  return {
    id,
    title,
    firstName,
    lastName,
    initials,
    displayName: asString(data['displayName']) ?? [title, initials, lastName].filter(Boolean).join(' '),
    branchId,
    isLead: asBoolean(data['isLead']),
    status: data['status'] === 'inactive' ? 'inactive' : branchId ? 'active' : 'unassigned'
  };
}
