import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { ProductService } from 'src/app/product.service';
import { Product } from 'src/app/models/productmodel';

@Component({
  selector: 'app-cartpage',
  templateUrl: './cartpage.component.html',
  styleUrls: ['./cartpage.component.css'],
})
export class CartpageComponent implements OnInit {
  cartForm: FormGroup;

  constructor(private productService: ProductService, private fb: FormBuilder) {
    this.cartForm = this.fb.group({
      cartItems: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.loadCartItems();
  }

  get cartItems(): FormArray {
    return this.cartForm.get('cartItems') as FormArray;
  }

  // Load cart items and populate the form
  loadCartItems(): void {
    this.productService.getCartItems().subscribe(cart => {
      this.cartItems.clear();
      cart.forEach(item => {
        this.cartItems.push(
          this.fb.group({
            product: [item],  // Ensure the product data is passed correctly
            quantity: [item.quantity || 1],  // Ensure you set the correct quantity, default to 1 if not found
          })
        );
      });
    });
  }
  

  // Increment quantity for a specific cart item
  incrementQuantity(index: number): void {
    const control = this.cartItems.at(index).get('quantity');
    if (control) {
      control.setValue(control.value + 1);
      this.updateCart(index);
    }
  }

  // Decrement quantity for a specific cart item
  decrementQuantity(index: number): void {
    const control = this.cartItems.at(index).get('quantity');
    if (control && control.value > 1) {
      control.setValue(control.value - 1);
      this.updateCart(index);
    }
  }

  // Update cart with the new quantity
  updateCart(index: number): void {
    const cartItem = this.cartItems.at(index).value;
    const updatedProduct = { ...cartItem.product, quantity: cartItem.quantity };
    this.productService.updateCart(updatedProduct).subscribe();
  }

  // Remove an item from the cart
  removeItem(index: number): void {
    const cartItem = this.cartItems.at(index).value;
    this.productService.deleteFromCart(cartItem.product).subscribe(() => {
      this.cartItems.removeAt(index);
    });
  }

  // Calculate the total price for a specific cart item
  getTotalForItem(index: number): number {
    const cartItem = this.cartItems.at(index).value;
    return cartItem.product.price * cartItem.quantity;
  }

  // Calculate the grand total for the cart
  getGrandTotal(): number {
    return this.cartItems.controls.reduce((total, control) => {
      const cartItem = control.value;
      return total + cartItem.product.price * cartItem.quantity;
    }, 0);
  }
}
