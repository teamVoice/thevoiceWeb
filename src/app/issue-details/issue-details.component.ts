import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../firestore.service';

@Component({
  selector: 'app-issue-details',
  templateUrl: './issue-details.component.html',
  styleUrls: ['./issue-details.component.css']
})
export class IssueDetailsComponent implements OnInit {
  issues: any[] = [];
  currentIndex: number = 0;

  constructor(private firestoreService: FirestoreService) {}

  ngOnInit(): void {
    this.loadIssues();
  }

  loadIssues() {
    this.firestoreService.getIssues().subscribe(
      issues => {
        this.issues = issues;
      },
      error => console.error('Error fetching issues:', error)
    );
  }

  showNextIssue() {
    if (this.currentIndex < this.issues.length - 1) {
      this.currentIndex++;
    }
  }

  showPreviousIssue() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  transferDataToSolve() {
    this.transferData('solve-issues');
  }

  transferDataToSpam() {
    this.transferData('SpamFolder');
  }

  private transferData(destination: string) {
    const currentIssue = this.issues[this.currentIndex];

    // Transfer data to the selected destination collection
    this.firestoreService.transferData(currentIssue, destination)
      .subscribe(() => {
        // Reload issues after successful transfer and deletion
        this.loadIssues();
        console.log(`Data transferred successfully to ${destination}.`);
      });
  }
}
