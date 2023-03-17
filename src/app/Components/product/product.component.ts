import { Component, Input } from '@angular/core';
import { HttpapiService } from 'src/app/Services/httpapi.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent {
  @Input('product') product: any;
  @Input('productMap') productMap: any;
  quantity: number = 0;
  orderId: number = -1;
  constructor(private api: HttpapiService) {}

  ngOnInit() {
    //console.log('On changes');
    console.log(this.productMap);
  }

  onBuy() {
    this.orderId = parseInt(localStorage.getItem('orderId') ?? '-1');
    if (this.orderId === -1) {
      window.alert('orderId is unknown');
    } else {
      this.api
        .postDataWithTextResponse(
          this.api.joinPaths([
            'order',
            'add',
            'product',
            this.product.id.toString(),
          ]),
          {
            orderId: this.orderId,
          },
          true
        )
        .subscribe((data) => {
          console.log(data);
          if (!this.productMap.hasOwnProperty(this.product.id)) {
            this.quantity = 1;
          } else {
            this.quantity = this.productMap[this.product.id] + 1;
            console.log(this.quantity);
          }
        });
    }
  }
}
