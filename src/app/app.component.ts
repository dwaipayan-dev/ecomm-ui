import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'ecommui';
  user = '';
  constructor(private http: HttpClient) {
    localStorage.setItem(
      'token',
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsInVzZXJOYW1lIjoiRHdhaXBheWFuIiwiaWF0IjoxNjc4OTY0ODg1LCJleHAiOjE2Nzk4Mjg4ODV9.9EI1Nz5dG5s238RZbiTdCrek7X5PRNp6aHBv6X_21EE'
    );
    localStorage.setItem('user', 'Dwaipayan Vidyanta');
    this.user = localStorage.getItem('user') ?? '';
  }
}
