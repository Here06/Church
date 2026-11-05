import {DocumentData} from '@angular/fire/firestore';

export type ContentStatus = 'draft' | 'published';

/** Converts a Firestore Timestamp (or anything with `toDate()`) to a Date. */
export function toDate(value: unknown): Date | undefined {
  if (value instanceof Date) {
    return value;
  }
  if (value && typeof (value as {toDate?: unknown}).toDate === 'function') {
    return (value as {toDate(): Date}).toDate();
  }
  return undefined;
}

export const asString = (value: unknown): string | undefined =>
  typeof value === 'string' && value.trim() ? value.trim() : undefined;

export const asBoolean = (value: unknown, fallback = false): boolean =>
  typeof value === 'boolean' ? value : fallback;

export const asContentStatus = (value: unknown): ContentStatus => (value === 'published' ? 'published' : 'draft');

export type Parser<T> = (id: string, data: DocumentData) => T | null;

/** Parses raw documents, dropping (and logging) any that do not match the expected shape. */
export function parseAll<T>(rows: ReadonlyArray<DocumentData>, parse: Parser<T>, label: string): T[] {
  const parsed: T[] = [];
  for (const row of rows) {
    const {id, ...data} = row;
    const value = parse(String(id), data);
    if (value) {
      parsed.push(value);
    } else {
      console.warn(`[data] Skipping invalid ${label} document "${id}"`);
    }
  }
  return parsed;
}
