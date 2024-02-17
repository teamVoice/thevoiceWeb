import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../firestore.service';

@Component({
  selector: 'app-spam-details',
  templateUrl: './spam-details.component.html',
  styleUrls: ['./spam-details.component.css']
})
export class SpamDetailsComponent implements OnInit {

  spamIssues: any[] = [];
  currentIndex: number = 0;

  constructor(private firestoreService: FirestoreService) {}

  ngOnInit(): void {
    this.loadSpamIssues();
  }

  loadSpamIssues() {
    this.firestoreService.getSpamIssues().subscribe(spamIssues => {
      this.spamIssues = spamIssues;
    });
  }

  showNextIssue() {
    if (this.currentIndex < this.spamIssues.length - 1) {
      this.currentIndex++;
    }
  }

  showPreviousIssue() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  transferToSolve() {
    this.transferIssue('solve-issues');
  }

  private transferIssue(destination: string) {
    const issue = this.spamIssues[this.currentIndex];
    this.firestoreService.transferData(issue, destination).subscribe(() => {
      console.log(`Issue transferred successfully to ${destination}.`);
      this.spamIssues.splice(this.currentIndex, 1); // Remove the transferred issue from the spamIssues array
      if (this.currentIndex >= this.spamIssues.length) {
        this.currentIndex = this.spamIssues.length - 1; // Adjust currentIndex if it's out of bounds
      }
    });
  }

}
