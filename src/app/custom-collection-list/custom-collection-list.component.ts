import { Component, OnInit } from '@angular/core';

import { CustomCollectionsService } from '../CustomCollections.service'

@Component({
  selector: 'app-custom-collection-list',
  templateUrl: './custom-collection-list.component.html',
  styleUrls: ['./custom-collection-list.component.css'],
  providers: [CustomCollectionsService]
})
export class CustomCollectionListComponent implements OnInit {
  customCollectionsList: any[]
  constructor(private customCollectionsService: CustomCollectionsService) { }

  ngOnInit() {
    this.customCollectionsList = this.customCollectionsService.fetch();
  }

}
