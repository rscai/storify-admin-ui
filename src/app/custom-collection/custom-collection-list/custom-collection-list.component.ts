import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { CustomCollection } from '../CustomCollection';
import { HalCollection, Embedded } from 'app/hal/hal';
import { CustomCollectionService } from '../CustomCollection.service';



@Component({
  selector: 'app-custom-collection-list',
  templateUrl: './custom-collection-list.component.html',
  styleUrls: ['./custom-collection-list.component.css'],
  providers: [CustomCollectionService]
})
export class CustomCollectionListComponent implements OnInit {
  collection: HalCollection<CustomCollection>;
  constructor(private customCollectionService: CustomCollectionService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit() {
    this.customCollectionService.collection(1, 10).then(
      collection => this.collection = collection
    );
  }

  onNext(event: any) {
    console.log("call next");
    this.customCollectionService.collectionLink(this.collection._links.next)
      .then(
      collection => this.collection = collection,
    );
    event.preventDefault();
  }

  onPrevious() {
    console.log("call previous");
    this.customCollectionService.collectionLink(this.collection._links.prev)
      .then(
      collection => this.collection = collection,
      error => console.log(error)
      );
    event.preventDefault();

  }
  onDetail(customCollection: CustomCollection) {
    this.router.navigate([customCollection.id], { relativeTo: this.route });
  }

  onRemove(customCollection: CustomCollection) {
    this.customCollectionService.delete(customCollection)
      .then(customCollection => this.collection._embedded.custom_collections =
        this.collection._embedded.custom_collections.filter(ele => ele.id !== customCollection.id) as [CustomCollection])
  }
  onCreate() {
    this.router.navigate(['create'], { relativeTo: this.route });
  }

}
