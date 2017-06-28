import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { Product } from '../Product';
import { HalCollection, Embedded } from 'app/hal/hal';
import { ProductService } from '../Product.service';

@Component({
  selector: 'app-product-list',
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
    this.entityService.collection(1, 10).then(
      collection => this.collection = collection
    );
  }

  onNext(event: any) {
    console.log("call next");
    this.entityService.collectionLink(this.collection._links.next)
      .then(
      collection => this.collection = collection,
    );
    event.preventDefault();
  }

  onPrevious() {
    console.log("call previous");
    this.entityService.collectionLink(this.collection._links.prev)
      .then(
      collection => this.collection = collection,
      error => console.log(error)
      );
    event.preventDefault();

  }
  onDetail(entity: Product) {
    this.router.navigate([entity.id], { relativeTo: this.route });
  }

  onRemove(entity: Product) {
    this.entityService.delete(entity)
      .then(customCollection => this.collection._embedded.products =
        this.collection._embedded.products.filter(ele => ele.id !== customCollection.id) as [Product])
  }
  onCreate() {
    this.router.navigate(['create'], { relativeTo: this.route });
  }


}
