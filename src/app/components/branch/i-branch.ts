import {DocumentReference} from "@angular/fire/firestore";

export interface Branch {
  name: string;
  pastor: DocumentReference;
  region: string;
}
