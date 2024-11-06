import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';

@Component({
  standalone: true,
  imports: [FormsModule, CommonModule],
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  product = {
    title: '',
    description: '',
    price: 0,
    image: ''
  };
  showSuccessAlert = false;

  constructor(private productService: ProductService) {}

  onSubmit() {
    if (this.product.title && this.product.description && this.product.price > 0 && this.product.image) {
      this.productService.addProduct(this.product).subscribe(
        response => {
          console.log('Product added successfully:', response);
          this.showSuccessAlert = true;
          setTimeout(() => this.showSuccessAlert = false, 3000);
          
          this.product = {
            title: '',
            description: '',
            price: 0,
            image: ''
          };
        },
        error => {
          console.error('Error adding product:', error);
        }
      );
    }
  }
}
