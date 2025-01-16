import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../models/productmodel';


@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories: string[] = [];
  selectedCategory: string = '';

  constructor(
    private productService: ProductService,
  
  ) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
      this.filteredProducts = data;
    });
    this.categories = this.productService.getCategories();
  }


  // Filter products by category
  onCategoryChange(): void {
    if (this.selectedCategory === '') {
      this.filteredProducts = this.products; // Show all products if no category selected
    } else {
      this.filteredProducts = this.products.filter(
        product => product.category === this.selectedCategory
      );
    }
  }

  // Add product to cart using CartService
  addToCart(product: Product): void {
    this.productService.addToCart(product).subscribe(() => {
      console.log(`${product.name} added to cart`);
    });
  }
}
