import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HalService } from '../../hal/service';

import { InventoryItem } from './inventory-item';

import { environment } from '../../../environments/environment';

@Injectable()
export class InventoryItemService extends HalService<InventoryItem> {
  constructor(http: HttpClient) {
      super(http, environment.backend.inventory.url, 'inventoryItems');
  }
}