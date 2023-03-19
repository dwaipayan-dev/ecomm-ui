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
    console.log('app component loaded');
    const timerId = setInterval(() => {
      //console.log('Timer started');
      // if (!!this.user) {
      //   clearInterval(timerId);
      //   console.log('Timer cleared');
      // }
      this.user = localStorage.getItem('user') ?? '';
    }, 2000);
  }

  ngAfterView() {
    console.log(this.user);
  }

  ngOnChanges() {}

  logout() {
    localStorage.clear();
    this.user = '';
    this.router.navigate(['/login']);
  }
}
