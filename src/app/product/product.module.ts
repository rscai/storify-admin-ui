import { NgModule }       from '@angular/core';
import { FormsModule }    from '@angular/forms';
import { CommonModule }   from '@angular/common';

import { ProductService } from './Product.service';
import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';

@NgModule({
  imports:[
    CommonModule,
    FormsModule,
    ProductRoutingModule
  ],
  declarations:[
    ProductComponent,
    ProductListComponent,
    ProductDetailComponent
  ],
  providers:[
    ProductService
  ]
})
export class ProductModule {}
