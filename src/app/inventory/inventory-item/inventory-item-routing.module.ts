import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InventoryItemComponent } from './inventory-item.component';
import { InventoryItemListComponent } from './inventory-item-list/inventory-item-list.component';
import { InventoryItemCreateComponent } from './inventory-item-create/inventory-item-create.component';
import { InventoryItemDetailComponent } from './inventory-item-detail/inventory-item-detail.component';
import { InventoryItemResolver } from './inventory-item-resolver';

const inventoryItemRoutes: Routes = [
    {
        path: '',
        component: InventoryItemComponent,
        children: [
            {
                path: '',
                component: InventoryItemListComponent
            },
            {
                path: 'create',
                component: InventoryItemCreateComponent
            },
            {
                path: ':id',
                component: InventoryItemDetailComponent,
                resolve: {
                    inventoryItem: InventoryItemResolver
                }
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(inventoryItemRoutes)
    ],
    exports: [
        RouterModule
    ],
    providers: [
        InventoryItemResolver
    ]
})
export class InventoryItemRoutingModule { }