import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { ProductService } from '../../../product.service';
import { BehaviorSubject, of } from 'rxjs';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let mockProductService: jasmine.SpyObj<ProductService>;

  beforeEach(async () => {
    mockProductService = jasmine.createSpyObj('ProductService', ['cartCount$']);
    
    // Mock cartCount$ as an observable with a default value
    mockProductService.cartCount$ = new BehaviorSubject<number>(0); // Using BehaviorSubject here to mimic real behavior

    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [{ provide: ProductService, useValue: mockProductService }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the header component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize cart count from the service', () => {
    component.ngOnInit(); // Initialize the component and check if the count is subscribed
    expect(component.cartCount).toBe(0); // Verify the cart count is correct
  });
});
