import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../models/productmodel';
import { trigger, transition, animate, style } from '@angular/animations';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css'],
  animations: [
    trigger('moveToCart', [
      transition('void => *', [
        style({ transform: 'scale(0)', opacity: 0 }),
        animate('0.5s ease-in', style({ transform: 'scale(1)', opacity: 1 }))
      ]),
      transition('* => void', [
        animate('0.5s ease-out', style({ transform: 'scale(0)', opacity: 0 }))
      ])
    ])
  ]
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories: string[] = [];
  selectedCategory: string = '';
  cartItems: Product[] = [];  // Track items in the cart
  loading: boolean = false;
  error: string = '';

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loading = true;
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.filteredProducts = data;
        this.categories = this.productService.getCategories();
        this.loading = false;
      },
      error: () => {
        this.error = 'Sorry, we are unable to load the products at the moment. Please try again later.';
        this.loading = false;
      }
    });
  }

  // Filter products by category
  onCategoryChange(): void {
    this.filteredProducts = this.selectedCategory
      ? this.products.filter(product => product.category === this.selectedCategory)
      : this.products;
  }

  // Add product to cart if not already present
  addToCart(product: Product): void {
    this.productService.getCart().subscribe({
      next: (cartItems: Product[]) => {
        const isAlreadyInCart = cartItems.some(item => item.id === product.id);
  
        if (isAlreadyInCart) {
          alert(`${product.name} is already in the cart.`);
          return;
        }
  
        this.productService.addToCart(product).subscribe({
          next: () => {
            this.cartItems.push(product);
            console.log(`${product.name} added to cart`);
            alert(`${product.name} has been added to the cart.`);
          },
          error: () => {
            this.error = 'Error adding to cart';
          }
        });
      },
      error: () => {
        this.error = 'Error fetching cart data';
      }
    });
  }
  
}
