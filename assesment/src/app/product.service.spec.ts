import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductService } from './product.service';
import { Product } from './models/productmodel';
import { BehaviorSubject } from 'rxjs';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;
  let cartCountSubject: BehaviorSubject<number>;

  const mockProduct: Product = {
    id: 1,
    name: "iPhone 13",
    price: 69999,
    category: "Mobiles",
    imageUrl: "https://m.media-amazon.com/images/I/71xb2xkN5qL.jpg",
    description: "A powerful smartphone from Apple featuring the A15 Bionic chip, advanced dual-camera system, and a stunning Super Retina XDR display.",
    quantity: 1
  };

  const mockCartItems: Product[] = [mockProduct];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService],
    });
    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
    cartCountSubject = new BehaviorSubject<number>(0);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all products', () => {
    service.getProducts().subscribe((products) => {
      expect(products).toEqual([mockProduct]);
    });

    const req = httpMock.expectOne('http://localhost:3000/products');
    expect(req.request.method).toBe('GET');
    req.flush([mockProduct]);
  });

  it('should get all categories', () => {
    const categories = service.getCategories();
    expect(categories).toEqual(['Electronics', 'Clothing', 'Home Appliances', 'Smartwatches', 'TVs', 'Mobiles']);
  });

  
  it('should get cart items', () => {
    service.getCartItems().subscribe((cartItems) => {
      expect(cartItems).toEqual(mockCartItems);
    });

    const req = httpMock.expectOne('http://localhost:3000/cart');
    expect(req.request.method).toBe('GET');
    req.flush(mockCartItems);
  });

  
  it('should get product by ID', () => {
    service.getProductById(1).subscribe((product) => {
      expect(product).toEqual(mockProduct);
    });

    const req = httpMock.expectOne('http://localhost:3000/products/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockProduct);
  });


});
