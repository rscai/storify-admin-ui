import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { Observable } from 'rxjs';

import { Product } from '../Product';
import { HalCollection, Embedded } from '../../hal/hal';
import { ProductService } from '../Product.service';

@Component({
  selector: 'div[catalog-product-list].container-fluid',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  collection: HalCollection<Product>;
  constructor(private entityService: ProductService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit() {
    this.entityService.collection(1, 10).subscribe(
      (collection: HalCollection<Product>) => this.collection = collection,
      error => console.log(error)
    );
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
    this.router.navigate([entity.id], { relativeTo: this.route });
  }

  onRemove(entity: Product) {

  }
  onCreate() {
    this.router.navigate(['create'], { relativeTo: this.route });
  }


}
