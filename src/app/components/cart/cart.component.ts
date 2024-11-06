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

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      console.log('Updated cart items in CartComponent:', this.cartItems); // Log to verify subscription
    });
  }

  removeFromCart(item: any) {
    this.cartService.removeFromCart(item);
  }

  clearCart() {
    this.cartService.clearCart();
  }
}
