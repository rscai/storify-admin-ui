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
  editTitle: string;
  infoMessage: string;
  errorMessage: string;
  showProgressIndicator: boolean = false;
  progress: number;
  private mode: string;
  constructor(private route: ActivatedRoute,
    private router: Router, private service: CustomCollectionService) {

  }

  ngOnInit() {
    if (this.route.snapshot.url[0].path == 'create') {
      this.mode = 'CREATE';
      this.editTitle = 'New';
      this.customCollection = new CustomCollection();
      this.customCollection.id = this.generateId();
    } else {
      this.mode = 'UPDATE';
      this.editTitle = 'Edit';
      this.route.data
        .subscribe((data: { customCollection: CustomCollection }) => {
          this.customCollection = data.customCollection;
        });
    }

  }

  onSave() {
    console.log("on save");
    this.showProgress(.55);
    if (this.mode == 'CREATE') {
      this.service.create(this.customCollection)
        .then(createdOne => {
          this.customCollection=createdOne;
          this.hideProgress();
          this.info('Created Custom Collection successfully.');
          // convert mode
          this.mode = 'UPDATE';
        })
        .catch(error => {
          this.hideProgress();
          this.error('Created Custom Collection failed!');
        });
    } else if (this.mode == 'UPDATE') {

      this.service.update(this.customCollection)
      .then(updatedOne => {
        this.customCollection=updatedOne;
        this.hideProgress();
        this.info('Updated Custom Collection successfully.');
      })
      .catch(error => {
        this.hideProgress();
        this.error('Updated Custom Collection failed!');
      });
    }
  }

  private showProgress(percent: number) {
    this.showProgressIndicator=true;
    this.progress=percent;
  }
  private hideProgress() {
    this.showProgressIndicator=false;
  }
  private info(message: string){
    this.errorMessage=null;
    this.infoMessage=message;
  }
  private error(message: string) {
    this.infoMessage=null;
    this.errorMessage=message;
  }

  private generateId(): string {
    return 'test' + Date.now().toString();
  }

}
