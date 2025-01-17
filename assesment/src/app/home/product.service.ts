import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './models/productmodel';

@Injectable({
  providedIn: 'root'
})
export class ProductService {



  private productsUrl = 'http://localhost:3000/products';
  private cartUrl = 'http://localhost:3000/cart';

  constructor(private http:HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl);
  }

  getCategories(): string[] {
    return ['Electronics', 'Clothing', 'Home Appliances'];
  }
  addToCart(product: Product): Observable<Product> {  
    return this.http.post<Product>(this.cartUrl, product);
    
  } 

  getCart(): Observable<Product[]> {
    return this.http.get<Product[]>(this.cartUrl);
  }

  
  deleteFromCart(product: Product): Observable<Product> {
    return this.http.delete<Product>(this.cartUrl + '/' + product.id);
}
getCartItems(): Observable<Product[]> {
  return this.http.get<Product[]>(this.cartUrl);
}

updateCart(product:Product):Observable<Product>{
  return this.http.put<Product>(this.cartUrl + '/' + product.id, product);
}



}