import {Injectable} from '@angular/core';
import {limit, orderBy, where} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {COLLECTIONS} from '../collections';
import {Announcement, parseAnnouncement} from '../models/announcement.model';
import {CollectionRepository} from './collection-repository';

/** Needs composite index: announcements(status ASC, publishAt DESC). */
@Injectable({providedIn: 'root'})
export class AnnouncementRepository extends CollectionRepository<Announcement> {
  constructor() {
    super(COLLECTIONS.announcements, parseAnnouncement);
  }

  getPublished(max = 20): Observable<Announcement[]> {
    return this.list(where('status', '==', 'published'), orderBy('publishAt', 'desc'), limit(max));
  }
}
