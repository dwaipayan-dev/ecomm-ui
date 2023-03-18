import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { HttpapiService } from 'src/app/Services/httpapi.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  totalProducts: number = 0;
  currentPage: number = 1;
  perPage: number = environment.perPage;
  totalPages: number = 0;
  products: any[] = [];
  orderedProducts: any = {};
  orderId: number | undefined = undefined;
  constructor(private api: HttpapiService) {
    api
      .getData(api.joinPaths(['product', 'find', 'total']), true)
      .subscribe((data) => {
        this.totalProducts = (data as any).count;
        this.totalPages = Math.floor(this.totalProducts / this.perPage);
        if (this.totalProducts % this.perPage > 0) {
          this.totalPages += 1;
        }
      });

    api
      .getData(api.joinPaths(['product', 'get', `${this.currentPage}`]), true)
      .subscribe((data) => {
        this.products = (data as any).page;
        console.log(this.products);
      });

    api
      .getData(api.joinPaths(['order', 'get', 'cart']), true)
      .subscribe((data) => {
        this.orderId = (data as any).cartId;
        if (this.orderId !== undefined)
          localStorage.setItem('orderId', this.orderId.toString());
      });

    api
      .getData(api.joinPaths(['order', 'fetch', 'cart']), true)
      .subscribe((data) => {
        let cart: any = (data as any).details;
        console.log(cart);
        if (!!cart) {
          let items: any[] = cart.items;
          for (let i = 0; i < items.length; i++) {
            let product: any = items[i].product;
            let productId: string = product.id.toString();
            if (!this.orderedProducts.hasOwnProperty(productId)) {
              this.orderedProducts[productId] = 1;
            } else {
              this.orderedProducts[productId] += 1;
            }
          }
          console.log(this.orderedProducts);
        }
      });
  }

  ngOnInit() {
    console.log(this.products);
  }

  onNext() {
    this.currentPage += 1;
    this.api
      .getData(
        this.api.joinPaths(['product', 'get', `${this.currentPage}`]),
        true
      )
      .subscribe((data) => {
        this.products = (data as any).page;
        console.log(this.products);
      });
  }

  onPrev() {
    this.currentPage -= 1;
    this.api
      .getData(
        this.api.joinPaths(['product', 'get', `${this.currentPage}`]),
        true
      )
      .subscribe((data) => {
        this.products = (data as any).page;
        console.log(this.products);
      });
  }
}
