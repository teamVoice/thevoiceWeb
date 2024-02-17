import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage'; // Import AngularFireStorage

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(private firestore: AngularFirestore, private storage: AngularFireStorage) {} // Inject AngularFireStorage

  getIssues(): Observable<any[]> {
    return this.firestore.collection('Issues').valueChanges();
  }

  getsolveIssues(): Observable<any[]> {
    return this.firestore.collection('solve-issues').valueChanges();
  }

  getSpamIssues(): Observable<any[]> {
    return this.firestore.collection('SpamFolder').valueChanges();
  }


  getUsers(): Observable<any[]> {
    return this.firestore.collection('Users').valueChanges();
  }

  transferData(data: any, destination: string): Observable<void> {
    if (typeof data === 'object' && data !== null) {
      const destinationRef = this.firestore.collection(destination).doc(data.id).ref;
      const sourceRef = this.firestore.collection('Issues').doc(data.id).ref;
  
      console.log(`Transfer Data to ${destination}:`, data);
  
      const batch = this.firestore.firestore.batch();
      batch.set(destinationRef, data);
  
      batch.delete(sourceRef);
      console.log('Data deleted from source collection:', data);
  
      return new Observable<void>((observer) => {
        batch
          .commit()
          .then(() => {
            console.log('Batch committed successfully.');
            observer.next();
            observer.complete();
          })
          .catch((error) => {
            console.error('Error committing batch:', error);
            observer.error(error);
          });
      });
    } else {
      console.error('Data is not an object.');
      return new Observable<void>((observer) => {
        observer.error('Data is not an object.');
      });
    }
  }
  
  
}
