import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Link, HalCollection } from '../../../hal/hal';
import { InventoryItem } from '../inventory-item';
import { InventoryItemService } from '../inventory-item.service';
import { Product } from '../../../catalog/product/Product';
import { ProductService } from '../../../catalog/product/Product.service';

@Component({
  selector: 'div[inventory-inventory-item-detail].container-fluid',
  templateUrl: './inventory-item-detail.component.html',
  styleUrls: ['./inventory-item-detail.component.css']
})
export class InventoryItemDetailComponent implements OnInit {
  entity: InventoryItem;
  product: Product;
  infoMessage: string;
  errorMessage: string;
  showProgressIndicator = false;
  progress: number;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private entityService: InventoryItemService,
    private productService: ProductService) { }

  ngOnInit() {
    this.route.data.subscribe(
      (data: { inventoryItem: InventoryItem }) => {
        this.entity = data.inventoryItem;
        this.productService.findOne(this.entity.productId).subscribe(
          (product: Product) => this.product = product,
          error => console.log(error)
        )
      },
      error => console.log(error)
    );
  }

  onSave() {
    this.showProgress(.55);
    this.entityService.update(this.entity).subscribe(
      (updatedOne: InventoryItem) => {
        this.entity = updatedOne;
        this.hideProgress();
        this.info('Updated InventoryItem successfully.');
      },
      error => {
        this.hideProgress();
        this.error('Updated InventoryItem failed.' + error);
      }
    );
  }

  private showProgress(percent: number) {
    this.showProgressIndicator = true;
    this.progress = percent;
  }
  private hideProgress() {
    this.showProgressIndicator = false;
  }
  private info(message: string) {
    this.errorMessage = null;
    this.infoMessage = message;
  }
  private error(message: string) {
    this.infoMessage = null;
    this.errorMessage = message;
  }


}
