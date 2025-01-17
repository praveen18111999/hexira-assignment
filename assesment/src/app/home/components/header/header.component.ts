import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../product.service';
import { count } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  cartCount: number = 0;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    // Subscribe to cartCount$ to get the updated cart count in real-time
    this.productService.cartCount$.subscribe(count => {
      this.cartCount = count;  // Update cartCount in header
    });
    console.log(this.cartCount);
  }
}
