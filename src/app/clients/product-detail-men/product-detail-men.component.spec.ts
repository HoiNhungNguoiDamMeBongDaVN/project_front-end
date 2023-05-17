import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailMenComponent } from './product-detail-men.component';

describe('ProductDetailMenComponent', () => {
  let component: ProductDetailMenComponent;
  let fixture: ComponentFixture<ProductDetailMenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductDetailMenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductDetailMenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
