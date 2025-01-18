import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Product } from './models/productmodel';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productsUrl = environment.apiUrl; 
  private cartUrl = environment.cartUrl;  

  // BehaviorSubject to keep track of the cart count
  private cartCountSubject = new BehaviorSubject<number>(this.getCartCountFromCookie());
  cartCount$ = this.cartCountSubject.asObservable();

  constructor(private http: HttpClient) {}

  // Get all products
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl);
  }

  // Get categories
  getCategories(): string[] {
    return ['Electronics', 'Clothing', 'Home Appliances','Smartwatches', 'TVs','Mobiles'];
  }

  // Add product to the cart and update count
  addToCart(product: Product): Observable<Product> {
    return this.http.post<Product>(this.cartUrl, product).pipe(
      // After adding the product, update the cart count
      tap(() => this.updateCartCount())
    );
  }

  // Get all cart items
  getCart(): Observable<Product[]> {
    return this.http.get<Product[]>(this.cartUrl);
  }

  // Delete product from cart and update count
  deleteFromCart(product: Product): Observable<Product> {
    return this.http.delete<Product>(`${this.cartUrl}/${product.id}`).pipe(
      // After removing the product, update the cart count
      tap(() => this.updateCartCount())
    );
  }

  // Get cart items
  getCartItems(): Observable<Product[]> {
    return this.http.get<Product[]>(this.cartUrl);
  }

  // Update product quantity in cart and update count
  updateCart(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.cartUrl}/${product.id}`, product).pipe(
      // After updating, update the cart count
      tap(() => this.updateCartCount())
    );
  }

  // Get product by ID
  getProductById(id: string | number): Observable<Product> {
    return this.http.get<Product>(`${this.productsUrl}/${id}`);
  }

  // Update the cart count after any change (add, remove, or update)
  updateCartCount(): void {
    this.getCartItems().subscribe((cartItems) => {
      // Count only unique products in the cart (ignoring quantity)
      const uniqueProductCount = new Set(cartItems.map((item) => item.id)).size;
      this.cartCountSubject.next(uniqueProductCount); // Update the cart count to reflect in all subscribers
      this.setCartCountInCookie(uniqueProductCount); // Save cart count in the cookie
    });
  }

  // Store the cart count in a cookie
  private setCartCountInCookie(count: number): void {
    document.cookie = `cartCount=${count};path=/;max-age=${60 * 60 * 24 * 365}`;
  }

  // Retrieve the cart count from a cookie
  private getCartCountFromCookie(): number {
    const match = document.cookie.match(new RegExp('(^| )cartCount=([^;]+)'));
    return match ? parseInt(match[2], 10) : 0;
  }
}
