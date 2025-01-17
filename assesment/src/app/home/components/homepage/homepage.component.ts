import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../product.service';
import { Product } from '../../../models/productmodel';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {





  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchQuery: string = '';
  selectedCategory: string = 'All';

  categories: string[] = [];
  loading: boolean = false;
  error: string = ``;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loading = true;  // Set loading to true initially

    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.filteredProducts = data;
        this.loading = false;  // Set loading to false after data is loaded
      },
      error: () => {
        this.error = 'Sorry, we are unable to load the products at the moment. Please try again later.';
        this.loading = false;  // Set loading to false in case of error
      }
    });

    // Fetch categories
    this.categories = this.productService.getCategories();
  }


  onSearchChange(): void {
    this.filterProducts();
  }

  onCategoryChange(): void {
    this.filterProducts();
  }

  private filterProducts(): void {
    this.filteredProducts = this.products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchesCategory = this.selectedCategory === 'All' || product.category === this.selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }



}
