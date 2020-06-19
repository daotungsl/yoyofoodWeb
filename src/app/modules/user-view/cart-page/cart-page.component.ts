import { Component, OnInit } from '@angular/core';
import { Item } from '../detail-page/item.component';
import { CustomerService } from 'src/app/auth/customer.service';
import { Product } from '../detail-page/product.component';
import { Iorder } from './order-tras.component';
import { ProductsService } from '../../shop-view/product/products.service';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'app-cart-page',
	templateUrl: './cart-page.component.html',
	styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit {
	items: Item[] = [];
	total: number = 0;
	product: Product;
	products: Product[] = [];
	typePay: number = 0;
	modalSuccess: any;
	closeResult: string;

	constructor(
		private customer: CustomerService,
		private modalService: NgbModal,
		private router: Router,
		private serviceProduct: ProductsService
	) { }

	ngOnInit() {
		this.loadCart();
		this.products = this.customer.getProduct();
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
			this.total += item.product.price * item.quantity;
		}

	}
	remove(id: number): void {
		let cart: any = this.customer.getCart();
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

	add(id: number): void {
		var item: Item = {
			product: this.product,
			quantity: 1
		};

		if (this.customer.getCart() == null) {
			let cart: any = [];
			cart.push(JSON.stringify(item));
			this.customer.setCart(cart);
		} else {
			let cart: any = this.customer.getCart();
			let index: number = -1;
			for (var i = 0; i < cart.length; i++) {
				let item: Item = JSON.parse(cart[i]);
				if (item.product.productId == id) {
					index = i;
					break;
				}
			}
			if (index == -1) {
				cart.push(JSON.stringify(item));
				this.customer.setCart(cart);
			} else {
				let item: Item = JSON.parse(cart[index]);
				item.quantity += 1;
				cart[index] = JSON.stringify(item);
				this.customer.setCart(cart);
			}
		}
		this.loadCart();

	}
	sub(id: number): void {
		var item: Item = {
			product: this.product,
			quantity: 1
		};

		if (this.customer.getCart() == null) {
			let cart: any = [];
			cart.push(JSON.stringify(item));
			this.customer.setCart(cart);
		} else {
			let cart: any = this.customer.getCart();
			let index: number = -1;
			for (var i = 0; i < cart.length; i++) {
				let item: Item = JSON.parse(cart[i]);
				if (item.product.productId == id) {
					index = i;
					break;
				}
			}
			if (index == -1) {
				cart.push(JSON.stringify(item));
				this.customer.setCart(cart);
			} else {
				let item: Item = JSON.parse(cart[index]);
				item.quantity -= 1;
				cart[index] = JSON.stringify(item);
				this.customer.setCart(cart);
			}
		}
		this.loadCart();

	}
	card(event) {
		console.log(event);
		if (event.target.checked) {
			this.typePay = 1
		}

	}
	sec(event) {
		console.log(event);
		if (event.target.checked) {
			this.typePay = 0
		}

	}
	checkOut(): void {
		let cart: any = this.customer.getCart();
		var order = {};
		order['account_id'] = JSON.parse(cart[0]).product.accountId;
		order['description'] = JSON.parse(cart[0]).product.description;
		order['total'] = this.total;
		order['typePay'] = this.typePay;
		order['orderDetails'] = [];
		order['orderDetails'].push({})
		order['orderDetails'].unshift({});
		for (var i = 0; i < cart.length; i++) {
			let item: Item = JSON.parse(cart[i]);
			order['orderDetails'][i]['product_id'] = item.product.productId;
			order['orderDetails'][i]['quantity'] = item.quantity;
			order['orderDetails'][i]['unitPrice'] = item.product.price;
		}

		console.log(order);
		this.serviceProduct.tryOder(order)
			.subscribe({
				next: value => {
					console.log(value)
					this.customer.removeCart();
					this.router.navigateByUrl('/');
				},
				error: err => {
					console.log(err)

				}
			})
	}

	open(oder, info, type, modalDimension) {
		if (modalDimension === '' && type === 'modal_add') {
			this.modalService.open(oder, { windowClass: 'modal-lage', size: 'sm', centered: true }).result.then((result) => {
				this.closeResult = `Closed with: ${result}`;
			}, (reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			});
		} else if (modalDimension === '' && type === 'modal_edit') {
			this.typePay = 1
			this.modalService.open(info, { windowClass: 'modal-lage', size: 'sm', centered: true }).result.then((result) => {
				this.closeResult = `Closed with: ${result}`;
				this.checkOut();
				this.modalService.open(oder, { windowClass: 'modal-danger', size: 'sm', centered: true }).result.then((result) => {
					this.closeResult = `Closed with: ${result}`;
				}, (reason) => {
					this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
				});
			}, (reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
				console.log("modal 2")

			});
		} else if (modalDimension === '' && type === 'modal_oder') {
			this.checkOut();
			this.modalService.open(oder, { windowClass: 'modal-danger', size: 'sm', centered: true }).result.then((result) => {
				this.closeResult = `Closed with: ${result}`;
			}, (reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			});

		} else {
			this.modalService.open(oder, { centered: true }).result.then((result) => {
				this.closeResult = `Closed with: ${result}`;
			}, (reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			});
		}




	}
	private getDismissReason(reason: any): string {
		if (reason === ModalDismissReasons.ESC) {
			return 'by pressing ESC';
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
			return 'by clicking on a backdrop';
		} else {
			return `with: ${reason}`;
		}
	}

}
