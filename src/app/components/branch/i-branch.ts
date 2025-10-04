import {DocumentReference} from "@angular/fire/compat/firestore";

export interface Branch {
  name: string;
  pastor: DocumentReference;
  region: string;
}
