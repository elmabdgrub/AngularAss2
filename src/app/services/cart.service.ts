import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = new BehaviorSubject<any[]>(this.getCartFromLocalStorage());
  cartItems$ = this.cartItems.asObservable();

  constructor() {}

  private getCartFromLocalStorage(): any[] {
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  }

  private updateLocalStorage(cart: any[]) {
    localStorage.setItem('cartItems', JSON.stringify(cart));
  }

  addToCart(item: any) {
    const currentCart = this.cartItems.value;
    const updatedCart = [...currentCart, item];
    this.cartItems.next(updatedCart);
    this.updateLocalStorage(updatedCart);
  }

  removeFromCart(item: any) {
    const currentCart = this.cartItems.value;
    const updatedCart = currentCart.filter(cartItem => cartItem.id !== item.id);
    this.cartItems.next(updatedCart);
    this.updateLocalStorage(updatedCart);
  }

  clearCart() {
    this.cartItems.next([]);
    this.updateLocalStorage([]);
  }
  getTotalItemsCount() {
    return this.cartItems.value.length;
  }
}
