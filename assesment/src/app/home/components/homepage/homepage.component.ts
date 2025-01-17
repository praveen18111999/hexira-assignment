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
  paginatedProducts: Product[] = [];  // For current page products
  searchQuery: string = '';
  selectedCategory: string = 'All';

  categories: string[] = [];
  loading: boolean = false;
  error: string = ``;

  productsPerPage: number = 15;
  currentPage: number = 1;
  totalPages: number = 0;
  pagesArray: number[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loading = true;  // Set loading to true initially

    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.filteredProducts = data;
        this.calculatePagination();  // Recalculate pagination after loading products
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

  // Triggered when the search input changes
  onSearchChange(): void {
    this.filterProducts();
  }

  // Triggered when the category selection changes
  onCategoryChange(): void {
    this.filterProducts();
  }

  // Filter products based on search query and selected category
  private filterProducts(): void {
    this.filteredProducts = this.products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchesCategory = this.selectedCategory === 'All' || product.category === this.selectedCategory;
      return matchesSearch && matchesCategory;
    });
    this.currentPage = 1;  // Reset to first page when filtering
    this.calculatePagination();  // Recalculate pagination after filtering
  }

  // Calculate total pages and update paginated products
  private calculatePagination(): void {
    this.totalPages = Math.ceil(this.filteredProducts.length / this.productsPerPage);
    this.pagesArray = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    this.updatePaginatedProducts();  // Update products for the first page
  }

  // Update products to show on the current page
  private updatePaginatedProducts(): void {
    const startIndex = (this.currentPage - 1) * this.productsPerPage;
    const endIndex = startIndex + this.productsPerPage;
    this.paginatedProducts = this.filteredProducts.slice(startIndex, endIndex);
  }

  // Change page when a page number is clicked
  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePaginatedProducts();
    }
  }

}
