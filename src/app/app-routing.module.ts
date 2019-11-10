import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const appRoutes: Routes = [
  {
    path: 'catalog/product',
    loadChildren: () => import('./catalog/product/product.module').then(m => m.ProductModule)
  },
  {
    path: 'catalog/productImage',
    loadChildren: () => import('./catalog/product-image/product-image.module').then(m => m.ProductImageModule)
  },
  {
    path: 'inventory/inventoryItem',
    loadChildren: () => import('./inventory/inventory-item/inventory-item.module').then(m => m.InventoryItemModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes
    )
  ],
  exports: [
    RouterModule
  ],
  providers: [
  ]
})
export class AppRoutingModule { }


/*
Copyright 2017 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
