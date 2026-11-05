import {DocumentData} from '@angular/fire/firestore';
import {asString, toDate} from './firestore-values';

export type DocumentCategory = 'constitution' | 'vision' | 'flyer' | 'other';
export type DocumentVisibility = 'public' | 'members';

/**
 * Where the file lives. `asset` files ship with the site (works on the Spark plan);
 * `storage` files live in Cloud Storage once the project moves to Blaze.
 */
export type DocumentSource = {type: 'asset'; path: string} | {type: 'storage'; path: string};

/** `documents/{id}` - metadata only; the PDF itself is not stored in Firestore. */
export interface ChurchDocument {
  id: string;
  title: string;
  category: DocumentCategory;
  language?: string;
  year?: number;
  version?: string;
  visibility: DocumentVisibility;
  source: DocumentSource;
  contentType: string;
  sizeBytes?: number;
  uploadedAt?: Date;
}

const CATEGORIES: readonly DocumentCategory[] = ['constitution', 'vision', 'flyer', 'other'];

export function parseChurchDocument(id: string, data: DocumentData): ChurchDocument | null {
  const title = asString(data['title']);
  const sourceType = data['source']?.type;
  const sourcePath = asString(data['source']?.path);
  if (!title || !sourcePath || (sourceType !== 'asset' && sourceType !== 'storage')) {
    return null;
  }
  const category = CATEGORIES.includes(data['category']) ? (data['category'] as DocumentCategory) : 'other';

  return {
    id,
    title,
    category,
    language: asString(data['language']),
    year: typeof data['year'] === 'number' ? data['year'] : undefined,
    version: asString(data['version']),
    visibility: data['visibility'] === 'members' ? 'members' : 'public',
    source: {type: sourceType, path: sourcePath},
    contentType: asString(data['contentType']) ?? 'application/pdf',
    sizeBytes: typeof data['sizeBytes'] === 'number' ? data['sizeBytes'] : undefined,
    uploadedAt: toDate(data['uploadedAt'])
  };
}

/**
 * URL for a document, or null when it cannot be served yet
 * (Storage-backed files need Cloud Storage, which is not enabled on the Spark plan).
 */
export function documentUrl(doc: ChurchDocument): string | null {
  return doc.source.type === 'asset' ? doc.source.path : null;
}
