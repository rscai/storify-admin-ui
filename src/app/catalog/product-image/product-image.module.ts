import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ProductImageService } from './product-image.service';
import { ProductImageRoutingModule } from './product-image-routing.module';
import { ProductImageComponent } from './product-image.component';
import { ProductImageListComponent } from './product-image-list/product-image-list.component';
import { ProductImageDetailComponent } from './product-image-detail/product-image-detail.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ProductImageRoutingModule
    ],
    declarations: [
        ProductImageComponent,
        ProductImageListComponent,
        ProductImageDetailComponent
    ],
    providers: [
        ProductImageService
    ]
})
export class ProductImageModule { }
