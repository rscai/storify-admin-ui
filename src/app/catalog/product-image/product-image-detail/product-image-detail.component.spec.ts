import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ProductImageRoutingModule } from '../product-image-routing.module';
import { ProductImageService } from '../product-image.service';
import { ProductImageDetailComponent } from './product-image-detail.component';

describe('ProductImageDetailComponent', () => {
  let component: ProductImageDetailComponent;
  let fixture: ComponentFixture<ProductImageDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductImageDetailComponent ],
      imports: [
        CommonModule,
        FormsModule,
        ProductImageRoutingModule
    ],
    providers: [
      ProductImageService
  ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductImageDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
