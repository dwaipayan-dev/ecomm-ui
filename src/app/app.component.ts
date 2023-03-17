import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'ecommui';
  user = '';
  constructor(private http: HttpClient, private router: Router) {
    const timerId = setInterval(() => {
      if (!!this.user) clearInterval(timerId);
      this.user = localStorage.getItem('user') ?? '';
    }, 2000);
  }

  ngOnChanges() {}

  logout() {
    localStorage.clear();
    this.user = '';
    this.router.navigate(['/login']);
  }
}
