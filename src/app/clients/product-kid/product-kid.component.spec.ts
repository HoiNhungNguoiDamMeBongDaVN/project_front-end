import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductKidComponent } from './product-kid.component';

describe('ProductKidComponent', () => {
  let component: ProductKidComponent;
  let fixture: ComponentFixture<ProductKidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductKidComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductKidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
