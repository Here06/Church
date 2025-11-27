import {DocumentReference} from "@angular/fire/firestore";
import { PastorInfo } from "./pastor-interface";

export interface BranchInfo {
  id: string;
  name: string;
  // pastor: DocumentReference;
  pastorPath?: string;
  pastor?: PastorInfo;
  region: string;
}
