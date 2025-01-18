import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartpageComponent } from '../cartpage/cartpage.component';
import { ProductService } from 'src/app/product.service';
import { of, throwError } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { Product } from 'src/app/models/productmodel';
import { RouterTestingModule } from '@angular/router/testing';

describe('CartpageComponent', () => {
  let component: CartpageComponent;
  let fixture: ComponentFixture<CartpageComponent>;
  let mockProductService: jasmine.SpyObj<ProductService>;

  const mockProduct: Product = {
    id: 1,
    name: 'Product A',
    category: 'Electronics',
    price: 100,
    imageUrl: 'img1.jpg',
    quantity: 0
  };

  const cartItems = [
    { product: mockProduct, quantity: 2 },
    { product: { ...mockProduct, id: 2, name: 'Product B' }, quantity: 3 },
  ];

  beforeEach(async () => {
    mockProductService = jasmine.createSpyObj('ProductService', [
      'getCartItems',
      'updateCart',
      'deleteFromCart',
    ]);
    mockProductService.getCartItems.and.returnValue(of(cartItems.map(item => item.product)));
    mockProductService.updateCart.and.returnValue(of(mockProduct));
    mockProductService.deleteFromCart.and.returnValue(of(mockProduct));

    await TestBed.configureTestingModule({
      declarations: [CartpageComponent],
      imports: [ RouterTestingModule ] ,
      providers: [FormBuilder, { provide: ProductService, useValue: mockProductService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load cart items on initialization', () => {
    component.ngOnInit();
    expect(mockProductService.getCartItems).toHaveBeenCalled();
    expect(component.cartItems.length).toBe(2);
  });

  it('should increment the quantity of a cart item', () => {
    component.cartForm.setValue({ cartItems: cartItems });
    component.incrementQuantity(0);
    const quantity = component.cartItems.at(0).get('quantity')?.value;
    expect(quantity).toBe(3); // Incremented from 2 to 3
    expect(mockProductService.updateCart).toHaveBeenCalled();
  });

  it('should decrement the quantity of a cart item', () => {
    component.cartForm.setValue({ cartItems: cartItems });
    component.decrementQuantity(1);
    const quantity = component.cartItems.at(1).get('quantity')?.value;
    expect(quantity).toBe(2); // Decremented from 3 to 2
    expect(mockProductService.updateCart).toHaveBeenCalled();
  });


  it('should update the cart with new quantities', () => {
    component.cartForm.setValue({ cartItems: cartItems });
    component.updateCart(0);
    expect(mockProductService.updateCart).toHaveBeenCalledWith({
      ...mockProduct,
      quantity: 2,
    });
  });

  it('should remove an item from the cart', () => {
    component.cartForm.setValue({ cartItems: cartItems });
    component.removeItem(0);
    expect(component.cartItems.length).toBe(1); // First item removed
    expect(mockProductService.deleteFromCart).toHaveBeenCalledWith(mockProduct);
  });

  it('should calculate the total price for an item', () => {
    component.cartForm.setValue({ cartItems: cartItems });
    const total = component.getTotalForItem(0);
    expect(total).toBe(200); // 2 * 100 = 200
  });





});
