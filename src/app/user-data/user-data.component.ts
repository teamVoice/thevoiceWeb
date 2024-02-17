// user-data.component.ts

import { Component } from '@angular/core';
import { FirestoreService } from '../firestore.service';
@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})
export class UserDataComponent {
  users: any[] = [];

  constructor(private firestoreService: FirestoreService) {}

 
  
  
}
