import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../firestore.service';

@Component({
  selector: 'app-circular-representation',
  templateUrl: './circular-representation.component.html',
  styleUrls: ['./circular-representation.component.css']
})
export class CircularRepresentationComponent implements OnInit {
  solveissues: any[] = [];
  unsolvessues: any[] = [];
  spamIssues: any[] = [];
  totalIssues: number = 0;

  constructor(private firestoreService: FirestoreService) {}

  ngOnInit(): void {
    this.loadIssues();
  }

  loadIssues() {
    this.firestoreService.getsolveIssues().subscribe(
      issues => {
        this.solveissues = issues;  
        this.calculateTotalIssues();
      },
      error => console.error('Error fetching solve issues:', error)
    );

    this.firestoreService.getIssues().subscribe(
      issues => {
        this.unsolvessues = issues;  
        this.calculateTotalIssues();
      },
      error => console.error('Error fetching unsolved issues:', error)
    );

    this.firestoreService.getSpamIssues().subscribe(
      issues => {
        this.spamIssues = issues;  
        this.calculateTotalIssues();
      },
      error => console.error('Error fetching spam issues:', error)
    );
  }

  calculateTotalIssues() {
    this.totalIssues = this.solveissues.length + this.unsolvessues.length + this.spamIssues.length;
  }  
}
