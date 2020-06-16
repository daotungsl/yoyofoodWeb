import { Component, OnInit } from '@angular/core';
import { Item } from '../detail-page/item.component';
import { CustomerService } from 'src/app/auth/customer.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit {
	private items: Item[] = [];
	private total: number = 0;
  constructor(
    private customer: CustomerService,

  ) { }

  ngOnInit() {
    this.loadCart();
  }
  loadCart(): void {
		this.total = 0;
		this.items = [];
		let cart = this.customer.getCart();
		for (var i = 0; i < cart.length; i++) {
			let item = JSON.parse(cart[i]);
			this.items.push({
				product: item.product,
				quantity: item.quantity
			});
			// this.total += item.product.price * item.quantity;
		}
  }
  remove(id: number): void {
		let cart: any = JSON.parse(localStorage.getItem('cart'));
		let index: number = -1;
		for (var i = 0; i < cart.length; i++) {
			let item: Item = JSON.parse(cart[i]);
			if (item.product.productId == id) {
				cart.splice(i, 1);
				break;
			}
    }
    this.customer.setCart(cart);
		this.loadCart();
	}
}
