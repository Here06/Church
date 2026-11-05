import {DocumentData} from '@angular/fire/firestore';
import {asBoolean, asContentStatus, asString, ContentStatus, toDate} from './firestore-values';

export type AnnouncementAudience = {all: true} | {branchIds: string[]};

/** `announcements/{id}` */
export interface Announcement {
  id: string;
  title: string;
  body: string;
  status: ContentStatus;
  publishAt: Date;
  expiresAt?: Date;
  pinned: boolean;
  audience: AnnouncementAudience;
  attachmentDocIds: string[];
}

export function parseAnnouncement(id: string, data: DocumentData): Announcement | null {
  const title = asString(data['title']);
  const body = asString(data['body']);
  const publishAt = toDate(data['publishAt']);
  if (!title || !body || !publishAt) {
    return null;
  }
  const branchIds = Array.isArray(data['audience']?.branchIds)
    ? (data['audience'].branchIds as unknown[]).filter((b): b is string => typeof b === 'string')
    : [];

  return {
    id,
    title,
    body,
    status: asContentStatus(data['status']),
    publishAt,
    expiresAt: toDate(data['expiresAt']),
    pinned: asBoolean(data['pinned']),
    audience: branchIds.length ? {branchIds} : {all: true},
    attachmentDocIds: Array.isArray(data['attachmentDocIds'])
      ? (data['attachmentDocIds'] as unknown[]).filter((d): d is string => typeof d === 'string')
      : []
  };
}

/** True when the announcement should currently be shown. */
export function isCurrent(a: Announcement, now = new Date()): boolean {
  return a.status === 'published' && a.publishAt <= now && (!a.expiresAt || a.expiresAt > now);
}
