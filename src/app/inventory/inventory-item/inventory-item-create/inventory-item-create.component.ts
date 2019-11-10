import { Component, OnInit } from '@angular/core';

import { Link, HalCollection } from '../../../hal/hal';
import { Product } from '../../../catalog/product/Product';
import { ProductService } from '../../../catalog/product/Product.service';
import { InventoryItem } from '../inventory-item';
import { InventoryItemService } from '../inventory-item.service';

@Component({
  selector: 'div[inventory-inventory-item-create].container-fluid',
  templateUrl: './inventory-item-create.component.html',
  styleUrls: ['./inventory-item-create.component.css']
})
export class InventoryItemCreateComponent implements OnInit {
  entity: InventoryItem;
  infoMessage: string;
  errorMessage: string;
  showProgressIndicator = false;
  progress: number;
  product: Product;
  productCollection: HalCollection<Product>;

  constructor(private entityService: InventoryItemService,
    private productService: ProductService) { }

  ngOnInit() {
    this.product = new Product();
    this.productService.collection(0, 10).subscribe(
      (collection) => this.productCollection = collection
    );
    this.entity = new InventoryItem();
  }

  onProductCollectionPrev(event: any) {
    this.productService.collectionLink(this.productCollection._links.prev).subscribe(
      (collection: HalCollection<Product>) => this.productCollection = collection
    );
    event.preventDefualt();
  }
  onProductCollectionNext(event: any) {
    this.productService.collectionLink(this.productCollection._links.next).subscribe(
      (collection: HalCollection<Product>) => this.productCollection = collection
    );
    event.preventDefaut();
  }

  onChooseProduct(product: Product) {
    const productLink = product._links.self.href;
    const linkParts = productLink.split('/');
    const productId = linkParts[linkParts.length - 1];
    this.product = product;
    this.entity.productId = productId;
  }

  onSave() {
    console.log('on save...');
    this.showProgress(.55);
    this.entityService.create(this.entity).subscribe(
      (createdOne: InventoryItem) => {
        this.entity = createdOne;
        this.hideProgress();
        this.info('Created InventoryItem successfully.');
      },
      error => {
        this.hideProgress();
        this.error('Created InventoryItem failed.' + error.message);
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
