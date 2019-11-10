import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { InventoryItem } from './inventory-item';
import { InventoryItemService } from './inventory-item.service';

@Injectable()
export class InventoryItemResolver implements Resolve<InventoryItem> {
    constructor(private service: InventoryItemService, private router: Router) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<InventoryItem> {
        const id = route.params['id'];
        return this.service.findOne(id);
    }
}
