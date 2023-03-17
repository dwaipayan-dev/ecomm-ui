import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpapiService } from 'src/app/Services/httpapi.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  constructor(private api: HttpapiService, private router: Router) {}
  onSubmit() {
    this.api
      .postDataWithTextResponse(
        this.api.joinPaths(['auth', 'signup']),
        {
          name: this.name,
          email: this.email,
          password: this.password,
        },
        false
      )
      .subscribe((data) => {
        console.log('User added successfully');
        this.router.navigate(['/login']);
      });
  }
}
