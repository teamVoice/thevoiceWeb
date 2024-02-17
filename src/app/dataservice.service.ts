import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private firestore: AngularFirestore) { }

  getWeeklyUploads(): Observable<number[]> {
    // Assuming you have a collection named 'uploads' in Firestore with documents for each day of the week
    return this.firestore.collection<any>('uploads').valueChanges();
    // Replace 'uploads' with the correct collection name in your Firestore database
    // Adjust the data structure as per your Firestore collection schema
  }
}
