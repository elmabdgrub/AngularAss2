import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartService } from '../../services/cart.service';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  totalCost: number = 0;
  totalItems: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.totalCost = this.cartService.getTotalCost();
      this.totalItems = this.cartService.getTotalItemsCount();
      console.log(this.cartItems);
    });
  }

  removeFromCart(item: any) {
    this.cartService.removeFromCart(item);
  }

  clearCart() {
    this.cartService.clearCart();
  }
}
