import { Component, OnInit } from '@angular/core';


import { Observable } from 'rxjs/Observable';

import { CustomCollections } from '../model/CustomCollections';
import { HalCollection } from '../hal/hal';
import { CustomCollectionsService } from '../CustomCollections.service';



@Component({
  selector: 'app-custom-collection-list',
  templateUrl: './custom-collection-list.component.html',
  styleUrls: ['./custom-collection-list.component.css'],
  providers: [CustomCollectionsService]
})
export class CustomCollectionListComponent implements OnInit {
  collection: HalCollection<CustomCollections>;
  constructor(private customCollectionsService: CustomCollectionsService) { }

  ngOnInit() {
    this.customCollectionsService.collection(1, 10)
      .then(collection =>
        this.collection = collection);
  }

  onNext(event: any){
    console.log("call next");
    this.customCollectionsService.collectionLink(this.collection._links.next)
    .then(collection => this.collection = collection);
  }

  onPrevious(){
    console.log("call previous");
    this.customCollectionsService.collectionLink(this.collection._links.prev)
    .then(collection => this.collection = collection);
  }

}
