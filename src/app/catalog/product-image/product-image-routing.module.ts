import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductImageComponent } from './product-image.component';
import { ProductImageListComponent } from './product-image-list/product-image-list.component';
import { ProductImageDetailComponent } from './product-image-detail/product-image-detail.component';

import { ProductImageDetailResolver } from './product-image.service';

const productImageRoutes: Routes = [
    {
        path: '',
        component: ProductImageComponent,
        children: [
            {
                path: '',
                component: ProductImageListComponent
            },
            {
                path: 'create',
                component: ProductImageDetailComponent
            },
            {
                path: ':id',
                component: ProductImageDetailComponent,
                resolve: {
                    product: ProductImageDetailResolver
                }
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(productImageRoutes)
    ],
    exports: [
        RouterModule
    ],
    providers: [
        ProductImageDetailResolver
    ]
})
export class ProductImageRoutingModule { }
