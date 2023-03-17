import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  totalProducts: number = 0;
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http
      .get('http://localhost:8080/product/find/total')
      .pipe(
        catchError((err) => {
          return throwError(() => err);
        })
      )
      .subscribe((data) => {
        this.totalProducts = (data as any).count;
      });
  }
}
