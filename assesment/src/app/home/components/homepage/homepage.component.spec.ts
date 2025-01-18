import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomepageComponent } from './homepage.component';
import { ProductService } from '../../../product.service';
import { of, throwError } from 'rxjs';
import { Product } from '../../../models/productmodel';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('HomepageComponent', () => {
  let component: HomepageComponent;
  let fixture: ComponentFixture<HomepageComponent>;
  let mockProductService: jasmine.SpyObj<ProductService>;

  const mockProducts: Product[] = [
    {
      id: 1, name: 'Product A', category: 'Electronics', price: 100, imageUrl: 'img1.jpg',
      quantity: 0
    },
    {
      id: 2, name: 'Product B', category: 'Clothing', price: 50, imageUrl: 'img2.jpg',
      quantity: 0
    },
    {
      id: 3, name: 'Product C', category: 'Electronics', price: 200, imageUrl: 'img3.jpg',
      quantity: 0
    }
  ];

  beforeEach(async () => {
    mockProductService = jasmine.createSpyObj('ProductService', ['getProducts', 'getCategories']);
    mockProductService.getProducts.and.returnValue(of(mockProducts));
    mockProductService.getCategories.and.returnValue(['All', 'Electronics', 'Clothing']);

    await TestBed.configureTestingModule({
      declarations: [HomepageComponent],
      providers: [
        { provide: ProductService, useValue: mockProductService }
      ],
      schemas: [NO_ERRORS_SCHEMA]  // Ignores unknown component selectors
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();  // Runs ngOnInit()
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load products on initialization', () => {
    expect(component.products.length).toBe(3);
    expect(component.filteredProducts.length).toBe(3);
    expect(component.loading).toBeFalse();
  });

  it('should load categories on initialization', () => {
    expect(component.categories).toEqual(['All', 'Electronics', 'Clothing']);
  });

  it('should filter products by search query', () => {
    component.searchQuery = 'Product A';
    component.onSearchChange();
    expect(component.filteredProducts.length).toBe(1);
    expect(component.filteredProducts[0].name).toBe('Product A');
  });

  it('should filter products by category', () => {
    component.selectedCategory = 'Electronics';
    component.onCategoryChange();
    expect(component.filteredProducts.length).toBe(2);
  });

  it('should handle pagination correctly', () => {
    component.productsPerPage = 2;
    component.calculatePagination();

    expect(component.totalPages).toBe(2);
    expect(component.paginatedProducts.length).toBe(2);

    component.changePage(2);
    expect(component.paginatedProducts.length).toBe(1);
  });

 


  it('should not change page if the page number is invalid', () => {
    component.currentPage = 1;
    component.totalPages = 2;

    component.changePage(3);  // Invalid page
    expect(component.currentPage).toBe(1);

    component.changePage(0);  // Invalid page
    expect(component.currentPage).toBe(1);
  });
});
