import {DocumentReference} from '@angular/fire/compat/firestore';
import {doc, Firestore, getDoc, Timestamp} from "@angular/fire/firestore";
import {ChurchEvent} from "../components/calendar/i-event";
import {Branch} from "../components/branch/i-branch";

export class ChurchEventDto {
  static fromFirestore(data: any, id: string): ChurchEvent {
    return {
      id,
      name: data.name,
      start: (data.start as Timestamp).toDate(),
      end: data.end ? (data.end as Timestamp).toDate() : undefined,
      churchVenue: data.venue ? (data.venue as DocumentReference).path : undefined,
      type: data.type,
      place: data.place ?? 'TBD',
    };
  }

  static async resolveVenueName(firestore: Firestore, venuePath: string): Promise<string> {
    const ref = doc(firestore, venuePath);
    const snap = await getDoc(ref);
    return snap.exists() ? (snap.data() as Branch).name : 'Unknown';
  }

  static async enrich(firestore: Firestore, event: ChurchEvent): Promise<ChurchEvent> {
    if (!event.churchVenue) {
      return {...event};
    }

    const place = await ChurchEventDto.resolveVenueName(firestore, event.churchVenue);
    return {...event, place};
  }

}
