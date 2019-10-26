import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { Observable } from 'rxjs';

import { Product } from '../Product';
import { ProductImage } from '../../product-image/product-image';
import { HalCollection, Embedded } from '../../../hal/hal';
import { ProductService } from '../Product.service';
import { ProductImageService } from '../../product-image/product-image.service';

@Component({
  selector: 'div[catalog-product-list].container-fluid',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  collection: HalCollection<Product>;
  constructor(private entityService: ProductService,
    private imageService: ProductImageService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  private loadCollection(page: number, size: number) {
    this.entityService.collection(0, 10).subscribe(
      (collection: HalCollection<Product>) => {
        this.collection = collection;
        this.collection._embedded.products.forEach((product: Product) => {
          this.imageService.collectionLink(product._links.images).subscribe(
            (imageCollection: HalCollection<ProductImage>) => product.imageCollection = imageCollection._embedded.productImages,
            error => product.imageCollection = new Array()
          );
        });
      },
      error => console.log(error)
    );
  }

  ngOnInit() {
    this.loadCollection(0, 10);
  }

  onNext(event: any) {
    console.log('call next');
    this.entityService.collectionLink(this.collection._links.next)
      .subscribe(
        (collection: HalCollection<Product>) => this.collection = collection,
        error => console.log(error)
      );
    event.preventDefault();
  }

  onPrevious() {
    console.log('call previous');
    this.entityService.collectionLink(this.collection._links.prev)
      .subscribe(
        (collection: HalCollection<Product>) => this.collection = collection,
        error => console.log(error)
      );
    event.preventDefault();

  }
  onDetail(entity: Product) {
    const entityLink = entity._links.self.href;
    const linkParts = entityLink.split('/');
    const entityId = linkParts[linkParts.length - 1];
    this.router.navigate([entityId], { relativeTo: this.route });
  }

  onRemove(entity: Product) {
    this.entityService.delete(entity).subscribe(
      _ => this.loadCollection(this.collection.page.number, this.collection.page.size),
      error => console.log(error)
    );
  }
  onCreate() {
    this.router.navigate(['create'], { relativeTo: this.route });
  }


}
