import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { HalCollection } from '../../../hal/hal';
import { InventoryItem } from '../inventory-item';
import { InventoryItemService } from '../inventory-item.service';


@Component({
  selector: 'div[inventory-inventory-item-list].container-fluid',
  templateUrl: './inventory-item-list.component.html',
  styleUrls: ['./inventory-item-list.component.css']
})
export class InventoryItemListComponent implements OnInit {
  collection: HalCollection<InventoryItem>;
  constructor(private entityService: InventoryItemService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.entityService.collection(0, 10).subscribe(
      (collection: HalCollection<InventoryItem>) => this.collection = collection,
      error => console.log(error)
    );
  }

  onPrev(event: any) {
    this.entityService.collectionLink(this.collection._links.prev).subscribe(
      (collection: HalCollection<InventoryItem>) => this.collection = collection,
      error => console.log(error)
    );
    event.preventDefault();
  }

  onNext(event: any) {
    this.entityService.collectionLink(this.collection._links.next).subscribe(
      (collection: HalCollection<InventoryItem>) => this.collection = collection,
      error => console.log(error)
    );
    event.preventDefault();
  }

  onDetail(entity: InventoryItem) {
    const entityLink = entity._links.self.href;
    const linkParts = entityLink.split('/');
    const entityId = linkParts[linkParts.length - 1];
    this.router.navigate([entityId], { relativeTo: this.route });
  }

  onRemove(entity: InventoryItem) {
    this.entityService.delete(entity).subscribe(
      _ => this.reloadCollection(),
      error => console.log(error)
    );
  }

  private reloadCollection() {
    this.entityService.collection(this.collection.page.number, this.collection.page.size).subscribe(
      (collection: HalCollection<InventoryItem>) => this.collection = collection,
      error => console.log(error)
    );
  }
}
