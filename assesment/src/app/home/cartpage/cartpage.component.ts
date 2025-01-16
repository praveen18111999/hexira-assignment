import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../models/productmodel';

@Component({
  selector: 'app-cartpage',
  templateUrl: './cartpage.component.html',
  styleUrls: ['./cartpage.component.css']
})
export class CartpageComponent implements OnInit {
  cartItems: { product: Product, quantity: number }[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadCartItems();
  }

  // Fetch cart items from the server
  loadCartItems(): void {
    this.productService.getCartItems().subscribe(cart => {
      this.cartItems = cart.map(item => ({
        product: item,
        quantity: 1 // Initialize quantity as 1
      }));
    });
  }

  // Increment quantity for a specific cart item
  incrementQuantity(cartItem: { product: Product, quantity: number }): void {
    cartItem.quantity++;
    this.updateCart(cartItem);
  }

  // Decrement quantity for a specific cart item
  decrementQuantity(cartItem: { product: Product, quantity: number }): void {
    if (cartItem.quantity > 1) {
      cartItem.quantity--;
      this.updateCart(cartItem);
    }
  }

  // Update cart with the new quantity for the item
  updateCart(cartItem: { product: Product, quantity: number }): void {
    const updatedProduct = { ...cartItem.product, quantity: cartItem.quantity };
    this.productService.updateCart(updatedProduct).subscribe();
  }

  // Remove an item from the cart
  removeItem(cartItem: { product: Product, quantity: number }): void {
    this.productService.deleteFromCart(cartItem.product).subscribe(() => {
      this.cartItems = this.cartItems.filter(item => item !== cartItem);
    });
  }

  // Calculate the total price for a specific cart item (price * quantity)
  getTotalForItem(cartItem: { product: Product, quantity: number }): number {
    return cartItem.product.price * cartItem.quantity;
  }

  // Calculate the grand total for the cart
  getGrandTotal(): number {
    return this.cartItems.reduce((total, cartItem) => total + this.getTotalForItem(cartItem), 0);
  }
}
