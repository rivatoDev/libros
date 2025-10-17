import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductEditPage } from './books-edit-page';

describe('ProductEditPage', () => {
  let component: ProductEditPage;
  let fixture: ComponentFixture<ProductEditPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductEditPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
