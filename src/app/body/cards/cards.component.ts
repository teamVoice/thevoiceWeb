import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../firestore.service';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
  issues: any[] = [];
  solveIssues: any[] = [];
  spamIssues: any[] = [];
  showAll = false;
  imageUrls: string[] = []; // Array to hold image URLs

  constructor(
    private firestoreService: FirestoreService,
    private router: Router,
    private storage: AngularFireStorage
  ) {}

  ngOnInit(): void {
    this.loadPreview();
  }

  loadPreview() {
    this.firestoreService.getIssues().subscribe(issues => {
      this.issues = issues.slice(0, 3);
      this.getImageUrls(this.issues.map(issue => issue.id));
    });

    this.firestoreService.getsolveIssues().subscribe(solveIssues => {
      this.solveIssues = solveIssues.slice(0, 3);
      this.getImageUrls(this.solveIssues.map(issue => issue.id));
    });

    this.firestoreService.getSpamIssues().subscribe(spamIssues => {
      this.spamIssues = spamIssues.slice(0, 3);
      this.getImageUrls(this.spamIssues.map(issue => issue.id));
    });
  }

  getImageUrls(issueIds: string[]) {
    const observables = issueIds.map(issueId => {
      const ref = this.storage.ref(`images/issues/${issueId}`);
      return ref.getDownloadURL().toPromise();
    });

    Promise.all(observables).then(urls => {
      this.imageUrls = urls;
    }).catch(error => {
      console.error('Error fetching image:', error);
    });
  }

  loadAll() {
    this.firestoreService.getIssues().subscribe(issues => {
      this.issues = issues;
      this.showAll = true;
      this.getImageUrls(issues.map(issue => issue.id));
    });

    this.firestoreService.getsolveIssues().subscribe(solveIssues => {
      this.solveIssues = solveIssues;
      this.showAll = true;
      this.getImageUrls(solveIssues.map(issue => issue.id));
    });

    this.firestoreService.getSpamIssues().subscribe(spamIssues => {
      this.spamIssues = spamIssues;
      this.showAll = true;
      this.getImageUrls(spamIssues.map(issue => issue.id));
    });
  }
}