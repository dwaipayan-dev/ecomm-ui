import { Component } from '@angular/core';
import { HttpapiService } from 'src/app/Services/httpapi.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
})
export class HistoryComponent {
  orders: any[] = [];
  constructor(private api: HttpapiService) {
    api
      .getData(api.joinPaths(['order', 'fetch', 'orders']), true)
      .subscribe((data) => {
        this.orders = (data as any).details;
      });
  }
}
