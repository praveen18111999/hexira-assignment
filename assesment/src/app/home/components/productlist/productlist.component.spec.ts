import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductListComponent } from './productlist.component';
import { ProductService } from '../../../product.service';
import { ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';
import { Product } from '../../../models/productmodel';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let mockProductService: jasmine.SpyObj<ProductService>;

  const mockProduct: Product = {
    id: 1,
    name: "iPhone 13",
    price: 69999,
    category: "Mobiles",
    imageUrl: "https://m.media-amazon.com/images/I/71xb2xkN5qL.jpg",
    description: "A powerful smartphone from Apple featuring the A15 Bionic chip, advanced dual-camera system, and a stunning Super Retina XDR display.",
    quantity: 2
  };

  beforeEach(async () => {
    // Mock ProductService
    mockProductService = jasmine.createSpyObj('ProductService', ['getProductById', 'getCart', 'addToCart']);
    mockProductService.getProductById.and.returnValue(of(mockProduct));
    mockProductService.getCart.and.returnValue(of([]));  // Empty cart initially
    mockProductService.addToCart.and.returnValue(of(mockProduct));

    await TestBed.configureTestingModule({
      declarations: [ProductListComponent],
      providers: [
        { provide: ProductService, useValue: mockProductService },
        { 
          provide: ActivatedRoute, 
          useValue: {
            snapshot: {
              paramMap: {
                get: jasmine.createSpy('get').and.callFake((key: string) => {
                  if (key === 'id') return '1';  // Simulate product ID '1'
                  return null;
                })
              }
            }
          }
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]  // Ignore unknown elements and attributes
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load product by ID on initialization', () => {
    component.ngOnInit();
    expect(mockProductService.getProductById).toHaveBeenCalledWith('1');
    expect(component.product).toEqual(mockProduct);
    expect(component.loading).toBeFalse();
  });

  it('should handle error if product loading fails', () => {
    mockProductService.getProductById.and.returnValue(throwError(() => new Error('Failed to load')));
    component.ngOnInit();
    expect(component.error).toBe('Sorry, the product could not be loaded. Please try again later.');
    expect(component.loading).toBeFalse();
  });

  it('should handle invalid product ID', () => {
    const route = TestBed.inject(ActivatedRoute);
    (route.snapshot.paramMap.get as jasmine.Spy).and.returnValue(null);

    component.ngOnInit();
    expect(component.error).toBe('Invalid product ID.');
    expect(component.loading).toBeFalse();
  });

  it('should add product to the cart', () => {
    component.product = mockProduct;
    component.addToCart();
    expect(mockProductService.getCart).toHaveBeenCalled();
    expect(mockProductService.addToCart).toHaveBeenCalledWith(mockProduct);
  });

  it('should not add product to the cart if it is already in the cart', () => {
    mockProductService.getCart.and.returnValue(of([mockProduct]));  // Simulate product already in cart
    component.product = mockProduct;

    spyOn(window, 'alert');  // Spy on alert to prevent actual alert popups

    component.addToCart();

    expect(mockProductService.addToCart).not.toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith(`${mockProduct.name} is already in the cart.`);
  });

  it('should handle error while adding product to the cart', () => {
    mockProductService.getCart.and.returnValue(of([]));  // Simulate empty cart
    mockProductService.addToCart.and.returnValue(throwError(() => new Error('Error adding to cart')));
    component.product = mockProduct;

    component.addToCart();

    expect(component.error).toBe('Error adding the product to the cart.');
  });

  it('should handle error when fetching the cart', () => {
    mockProductService.getCart.and.returnValue(throwError(() => new Error('Error fetching the cart')));
    component.product = mockProduct;

    component.addToCart();

    expect(component.error).toBe('Error fetching the cart.');
  });
});