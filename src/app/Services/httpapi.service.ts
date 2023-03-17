import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class HttpapiService {
  private SERVER = environment.baseUrl;

  constructor(private http: HttpClient) {}

  public joinPaths(pathSegments: string[]) {
    return this.SERVER + '/' + pathSegments.join('/');
  }

  public handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => new Error(errorMessage));
  }

  public getData(url: string, isAuth: boolean) {
    let header = undefined;
    if (isAuth === true) {
      header = {
        Authorization: localStorage.getItem('token') + '',
      };
    }
    return this.http
      .get(url, {
        headers: header,
      })
      .pipe(catchError(this.handleError));
  }

  public postData(url: string, body: any, isAuth: boolean) {
    let header = undefined;
    let token = localStorage.getItem('token');
    if (isAuth === true) {
      header = {
        Authorization: !token ? '' : token,
      };
    }
    return this.http
      .post(url, body, {
        headers: header,
      })
      .pipe(catchError(this.handleError));
  }
}
