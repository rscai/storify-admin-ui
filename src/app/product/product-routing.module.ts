import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductComponent } from './product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';

import {ProductDetailResolver } from './product-detail-resolver.service';

const productRoutes: Routes =[
  {
    path:'',
    component: ProductComponent,
    children:[
      {
        path:'',
        component: ProductListComponent
      },
      {
        path:'create',
        component: ProductDetailComponent
      },
      {
        path:':id',
        component: ProductDetailComponent,
        resolve:{
          product: ProductDetailResolver
        }
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(productRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    ProductDetailResolver
  ]
})
export class ProductRoutingModule { }
