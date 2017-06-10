import { Component, OnInit, HostBinding } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


import { CustomCollection } from '../CustomCollection';
import { CustomCollectionService } from '../CustomCollection.service';

@Component({
  selector: 'app-custom-collection-detail',
  templateUrl: './custom-collection-detail.component.html',
  styleUrls: ['./custom-collection-detail.component.css']
})
export class CustomCollectionDetailComponent implements OnInit {
  customCollection: CustomCollection;
  private mode: string;
  constructor(private route: ActivatedRoute,
    private router: Router, private service: CustomCollectionService) {

  }

  ngOnInit() {
    if (this.route.snapshot.url[0].path == 'create') {
      this.mode = 'CREATE';
      this.customCollection = new CustomCollection();
      this.customCollection.id = this.generateId();
    } else {
      this.mode = 'UPDATE';
      this.route.data
        .subscribe((data: { customCollection: CustomCollection }) => {
          this.customCollection = data.customCollection;
        });
    }

  }

  onSave() {
    console.log("on save");
    if (this.mode == 'CREATE') {
      this.service.create(this.customCollection)
        .then(createdOne => console.log("created"));
    } else if (this.mode == 'UPDATE') {

      this.service.update(this.customCollection).then(
        updatedOne => console.log("updated")
      );
    }
  }

  private generateId(): string {
    return 'test' + Date.now().toString();
  }

}
