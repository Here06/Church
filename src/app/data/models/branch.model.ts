import {DocumentData} from '@angular/fire/firestore';
import {asString, toDate} from './firestore-values';

export type BranchStatus = 'active' | 'inactive';

export interface ServiceTime {
  day: string;
  time: string;
  label?: string;
}

/** `branches/{slug}` */
export interface Branch {
  id: string;
  name: string;
  region: string;
  status: BranchStatus;
  address?: {text?: string; googleLink?: string};
  serviceTimes: ServiceTime[];
  contact?: {phone?: string; email?: string};
  sortOrder?: number;
  updatedAt?: Date;
}

export function parseBranch(id: string, data: DocumentData): Branch | null {
  const name = asString(data['name']);
  const region = asString(data['region']);
  if (!name || !region) {
    return null;
  }

  const address = data['address'] && typeof data['address'] === 'object'
    ? {text: asString(data['address'].text), googleLink: asString(data['address'].googleLink)}
    : undefined;
  const contact = data['contact'] && typeof data['contact'] === 'object'
    ? {phone: asString(data['contact'].phone), email: asString(data['contact'].email)}
    : undefined;
  const serviceTimes: ServiceTime[] = [];
  for (const s of Array.isArray(data['serviceTimes']) ? (data['serviceTimes'] as DocumentData[]) : []) {
    const day = asString(s?.['day']);
    const time = asString(s?.['time']);
    if (day && time) {
      serviceTimes.push({day, time, label: asString(s['label'])});
    }
  }

  return {
    id,
    name,
    region,
    status: data['status'] === 'inactive' ? 'inactive' : 'active',
    address,
    serviceTimes,
    contact,
    sortOrder: typeof data['sortOrder'] === 'number' ? data['sortOrder'] : undefined,
    updatedAt: toDate(data['updatedAt'])
  };
}
