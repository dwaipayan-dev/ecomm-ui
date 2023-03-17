import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpapiService } from 'src/app/Services/httpapi.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  orderedProducts: any = {};
  items: string[] = [];
  orderId: number = -1;
  constructor(private api: HttpapiService, private router: Router) {
    api
      .getData(api.joinPaths(['order', 'fetch', 'cart']), true)
      .subscribe((data) => {
        let cart: any = (data as any).details;
        console.log(cart);
        if (!!cart) {
          let items: any[] = cart.items;
          for (let i = 0; i < items.length; i++) {
            let product: any = items[i].product;
            let productId: string = product.title;
            if (!this.orderedProducts.hasOwnProperty(productId)) {
              this.orderedProducts[productId] = 1;
            } else {
              this.orderedProducts[productId] += 1;
            }
          }
          this.items = Object.keys(this.orderedProducts);
        }
      });
  }

  placeOrder() {
    this.orderId = parseInt(localStorage.getItem('orderId') ?? '-1');
    if (this.orderId === -1) {
      window.alert('orderId is unknown');
    } else {
      this.api
        .postDataWithTextResponse(
          this.api.joinPaths(['order', 'place']),
          {
            orderId: this.orderId,
          },
          true
        )
        .subscribe((data) => {
          console.log(data);
          this.router.navigate(['/history']);
        });
    }
  }
}
