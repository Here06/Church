import {doc, DocumentReference, Firestore, getDoc,} from "@angular/fire/firestore";
import { BranchInfo } from "../interfaces/branch-interface"; 
import { PastorInfo } from "../interfaces/pastor-interface";

export class BranchDto{

    static fromFirestore(data: any, id: string): BranchInfo{
        return{
            id,
            name: data.name,
            region: data.region,
            pastorPath: data.pastor ? (data.pastor as DocumentReference).path : undefined,
            pastor: undefined
        };
    }

    static async resolvePastor(firestore: Firestore, pastorPath: string): Promise<PastorInfo | undefined>{
        const ref = doc(firestore, pastorPath);
        const snap = await getDoc(ref);

        if (!snap.exists()) {
            return undefined;
        }

      const data = snap.data();
      return {
        initials: data['initials'] || '',
        lastname: data['lastName'] || '',
        title: data['title'] || ''
      };
    }

    static async enrich(firestore: Firestore, branch:BranchInfo): Promise<BranchInfo>{

        if(!branch.pastorPath){
            return {... branch};
        }

        const pastor = await BranchDto.resolvePastor(firestore, branch.pastorPath);
        return {... branch, pastor};

       
    }
}