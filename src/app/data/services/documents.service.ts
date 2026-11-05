import {inject, Injectable} from '@angular/core';
import {map, Observable} from 'rxjs';
import {ChurchDocument, DocumentCategory} from '../models/church-document.model';
import {DocumentRepository} from '../repositories/document.repository';

@Injectable({providedIn: 'root'})
export class DocumentsService {
  private readonly repo = inject(DocumentRepository);

  getPublic(category?: DocumentCategory): Observable<ChurchDocument[]> {
    return this.repo.getPublic().pipe(
      map(docs => docs
        .filter(d => !category || d.category === category)
        .sort((a, b) => a.category.localeCompare(b.category) || a.title.localeCompare(b.title)))
    );
  }

  /** Used for an event's `documentId` (flyer). */
  get(id: string): Observable<ChurchDocument | null> {
    return this.repo.get(id);
  }
}
