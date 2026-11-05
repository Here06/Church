import {inject, Injectable} from '@angular/core';
import {map, Observable} from 'rxjs';
import {Announcement, isCurrent} from '../models/announcement.model';
import {AnnouncementRepository} from '../repositories/announcement.repository';

/** Pinned first, then newest first. */
export function currentAnnouncements(all: readonly Announcement[], now = new Date(), branchId?: string): Announcement[] {
  return all
    .filter(a => isCurrent(a, now))
    .filter(a => !branchId || 'all' in a.audience || a.audience.branchIds.includes(branchId))
    .sort((a, b) => Number(b.pinned) - Number(a.pinned) || b.publishAt.getTime() - a.publishAt.getTime());
}

@Injectable({providedIn: 'root'})
export class AnnouncementsService {
  private readonly repo = inject(AnnouncementRepository);

  /** Published, started and not expired; optionally limited to what is relevant to one branch. */
  getCurrent(branchId?: string): Observable<Announcement[]> {
    return this.repo.getPublished().pipe(map(all => currentAnnouncements(all, new Date(), branchId)));
  }
}
