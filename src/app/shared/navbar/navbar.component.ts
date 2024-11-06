import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterModule, CommonModule],
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  cartItemCount: number = 0;

  constructor(private authService: AuthService, private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.authService.loggedIn$.subscribe(status => {
      this.isLoggedIn = status;
    });

    this.cartService.cartItems$.subscribe(items => {
      this.cartItemCount = items.length;
    });
  }

  handleAuthAction() {
    if (this.isLoggedIn) {
      this.authService.logout();
      this.router.navigate(['/']); 
    } else {
      this.router.navigate(['/login']); 
    }
  }
}
