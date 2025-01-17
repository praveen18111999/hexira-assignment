import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../product.service';
import { Product } from '../../../models/productmodel';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css'],
})
export class ProductListComponent implements OnInit {
  product!: Product; // Single product
  loading: boolean = false;
  error: string = '';

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute // Inject ActivatedRoute to access route params
  ) { }
  ngOnInit(): void {
    this.loading = true;

    const productId = this.route.snapshot.paramMap.get('id');
    console.log('Product ID:', productId);

    if (productId) {
      this.productService.getProductById(productId).subscribe({
        next: (data: Product) => {
          this.product = data;
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Sorry, the product could not be loaded. Please try again later.';
          console.error(err);
          this.loading = false;
        }
      });
    } else {
      this.error = 'Invalid product ID.';
      this.loading = false;
    }
  }


  // Add the product to the cart
  addToCart(): void {
    this.productService.getCart().subscribe({
      next: (cartItems: Product[]) => {
        const isAlreadyInCart = cartItems.some(item => item.id === this.product.id);

        if (isAlreadyInCart) {
          alert(`${this.product.name} is already in the cart.`);
          return;
        }

        this.productService.addToCart(this.product).subscribe({
          next: () => {
            alert(`${this.product.name} has been added to the cart.`);
          },
          error: () => {
            this.error = 'Error adding the product to the cart.';
          },
        });
      },
      error: () => {
        this.error = 'Error fetching the cart.';
      },
    });
  }
}
