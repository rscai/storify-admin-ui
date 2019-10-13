import { Component, OnInit, HostBinding } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


import { Product } from '../Product';
import { ProductService } from '../Product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  entity: Product;
  editTitle: string;
  infoMessage: string;
  errorMessage: string;
  showProgressIndicator: boolean = false;
  progress: number;
  private mode: string;
  constructor(private route: ActivatedRoute,
    private router: Router, private service: ProductService) {

  }

  ngOnInit() {
    if (this.route.snapshot.url[0].path == 'create') {
      this.mode = 'CREATE';
      this.editTitle = 'New';
      this.entity = new Product();
    } else {
      this.mode = 'UPDATE';
      this.editTitle = 'Edit';
      this.route.data
        .subscribe((data: { product: Product }) => {
          this.entity = data.product;
        });
    }

  }

  onSave() {
    console.log("on save");
    this.showProgress(.55);
    if (this.mode == 'CREATE') {
      this.service.create(this.entity)
        .subscribe(createdOne => {
          this.entity=createdOne;
          this.hideProgress();
          this.info('Created Product successfully.');
          // convert mode
          this.mode = 'UPDATE';
        },
        error => {
          this.hideProgress();
          this.error('Created Product failed!');
        });
    } else if (this.mode == 'UPDATE') {

      this.service.update(this.entity)
      .subscribe(updatedOne => {
        this.entity=updatedOne;
        this.hideProgress();
        this.info('Updated Product successfully.');
      },
      error => {
        this.hideProgress();
        this.error('Updated Product failed!');
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

}
