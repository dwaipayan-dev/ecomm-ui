import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpapiService } from 'src/app/Services/httpapi.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private api: HttpapiService, private router: Router) {}

  onSubmit() {
    this.api
      .postData(
        this.api.joinPaths(['auth', 'login']),
        {
          email: this.email,
          password: this.password,
        },
        false
      )
      .subscribe((data) => {
        let token: string = (data as any).token;
        token = 'Bearer ' + token;
        let user: string = (data as any).user;
        localStorage.setItem('token', token);
        localStorage.setItem('user', user);
        this.router.navigate(['/home']);
      });
  }
}
