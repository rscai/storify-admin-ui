import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ProductService } from '../../catalog/product/Product.service';
import { InventoryItemService } from './inventory-item.service';
import { InventoryItemRoutingModule } from './inventory-item-routing.module';
import { InventoryItemComponent } from './inventory-item.component';
import { InventoryItemListComponent } from './inventory-item-list/inventory-item-list.component';
import { InventoryItemCreateComponent } from './inventory-item-create/inventory-item-create.component';
import { InventoryItemDetailComponent } from './inventory-item-detail/inventory-item-detail.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        InventoryItemRoutingModule
    ],
    declarations: [
        InventoryItemComponent,
        InventoryItemListComponent,
        InventoryItemCreateComponent,
        InventoryItemDetailComponent
    ],
    providers: [
        InventoryItemService,
        ProductService
    ]
})
export class InventoryItemModule { }