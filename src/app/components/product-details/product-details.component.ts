import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service'; 

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product: any;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!; 
    this.productService.getProductById(id).subscribe(
      data => {
        this.product = data;
      },
      error => {
        console.error('Error fetching product details:', error);
      }
    );
  }
  addToCart(product: any): void {
    this.cartService.addToCart(product);
    alert('Product added to cart!');
  }
}
