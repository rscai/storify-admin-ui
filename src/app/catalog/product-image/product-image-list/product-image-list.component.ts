import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { Observable } from 'rxjs';

import { ProductImage } from '../product-image';
import { HalCollection, Embedded } from '../../../hal/hal';
import { ProductImageService } from '../product-image.service';

@Component({
  selector: 'div[catalog-product-image-list].container-fluid',
  templateUrl: './product-image-list.component.html',
  styleUrls: ['./product-image-list.component.css']
})
export class ProductImageListComponent implements OnInit {
  collection: HalCollection<ProductImage>;
  constructor(private entityService: ProductImageService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit() {
    this.entityService.collection(0, 10).subscribe(
      (collection: HalCollection<ProductImage>) => this.collection = collection,
      error => console.log(error)
    );
  }

  onNext(event: any) {
    console.log('call next');
    this.entityService.collectionLink(this.collection._links.next)
      .subscribe(
        (collection: HalCollection<ProductImage>) => this.collection = collection,
        error => console.log(error)
      );
    event.preventDefault();
  }

  onPrevious() {
    console.log('call previous');
    this.entityService.collectionLink(this.collection._links.prev)
      .subscribe(
        (collection: HalCollection<ProductImage>) => this.collection = collection,
        error => console.log(error)
      );
    event.preventDefault();

  }
  onDetail(entity: ProductImage) {
    const entityLink = entity._links.self.href;
    const linkParts = entityLink.split('/');
    const entityId = linkParts[linkParts.length - 1];
    this.router.navigate([entityId], { relativeTo: this.route });
  }

  onRemove(entity: ProductImage) {
    this.entityService.delete(entity).subscribe(
      _ => this.entityService.collection(this.collection.page.number, this.collection.page.size).subscribe(
        (collection: HalCollection<ProductImage>) => this.collection = collection,
        error => console.log(error)),
      error => console.log(error)
    );
  }
}
