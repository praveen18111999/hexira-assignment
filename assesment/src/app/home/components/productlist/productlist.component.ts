import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../product.service';
import { Product } from '../../../models/productmodel';
import { ToastrService } from 'ngx-toastr';


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
    private route: ActivatedRoute,
    private toastr:ToastrService // Inject ActivatedRoute to access route params
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
  addToCart(): void {
    this.productService.getCart().subscribe({
      next: (cartItems: Product[]) => {
        const isAlreadyInCart = cartItems.some(item => item.id === this.product.id);
  
        if (isAlreadyInCart) {
          // Display a warning toast at the top with Bootstrap classes for warning
          this.toastr.warning(
            `${this.product.name} is already in the cart.`,
            'Warning', {
              positionClass: 'toast-top-right',  // Position the toast at the top-right
              toastClass: 'alert alert-warning'  // Apply Bootstrap alert-warning class
            }
          );
          return;
        }
  
        this.productService.addToCart(this.product).subscribe({
          next: () => {
            // Display a success toast at the top with Bootstrap classes for success
            this.toastr.success(
              `${this.product.name} has been added to the cart.`,
              'Success', {
                positionClass: 'toast-top-right',  // Position the toast at the top-right
                toastClass: 'alert alert-success'  // Apply Bootstrap alert-success class
              }
            );
          },
          error: () => {
            // Display an error toast at the top with Bootstrap classes for error
            this.toastr.error(
              'Error adding the product to the cart.',
              'Error', {
                positionClass: 'toast-top-right',  // Position the toast at the top-right
                toastClass: 'alert alert-danger'   // Apply Bootstrap alert-danger class
              }
            );
          },
        });
      },
      error: () => {
        // Display an error toast at the top if there's an issue fetching the cart
        this.toastr.error(
          'Error fetching the cart.',
          'Error', {
            positionClass: 'toast-top-right',  // Position the toast at the top-right
            toastClass: 'alert alert-danger'   // Apply Bootstrap alert-danger class
          }
        );
      },
    });
  }
  
  
}
