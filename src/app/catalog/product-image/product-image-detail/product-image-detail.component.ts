import { Component, OnInit, HostBinding } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


import { ProductImage } from '../product-image';
import { ProductImageService } from '../product-image.service';

@Component({
    selector: 'div[catalog-product-image-detail].container-fluid',
    templateUrl: './product-image-detail.component.html',
    styleUrls: ['./product-image-detail.component.css']
})
export class ProductImageDetailComponent implements OnInit {
    entity: ProductImage;
    editTitle: string;x
    infoMessage: string;
    errorMessage: string;
    showProgressIndicator = false;
    progress: number;
    private mode: string;
    constructor(private route: ActivatedRoute,
        private router: Router, private service: ProductImageService) {

    }

    ngOnInit() {
        if (this.route.snapshot.url[0].path === 'create') {
            this.mode = 'CREATE';
            this.editTitle = 'New';
            this.entity = new ProductImage();
        } else {
            this.mode = 'UPDATE';
            this.editTitle = 'Edit';
            this.route.data
                .subscribe((data: { productImage: ProductImage }) => {
                    this.entity = data.productImage;
                });
        }

    }

    onSave() {
        console.log('on save');
        this.showProgress(.55);
        if (this.mode === 'CREATE') {
            this.service.create(this.entity)
                .subscribe(createdOne => {
                    this.entity = createdOne;
                    this.hideProgress();
                    this.info('Created ProductImage successfully.');
                    // convert mode
                    this.mode = 'UPDATE';
                },
                    error => {
                        this.hideProgress();
                        this.error('Created ProductImage failed!');
                    });
        } else if (this.mode === 'UPDATE') {

            this.service.update(this.entity)
                .subscribe(updatedOne => {
                    this.entity = updatedOne;
                    this.hideProgress();
                    this.info('Updated ProductImage successfully.');
                },
                    error => {
                        this.hideProgress();
                        this.error('Updated ProductImage failed!');
                    });
        }
    }

    private showProgress(percent: number) {
        this.showProgressIndicator = true;
        this.progress = percent;
    }
    private hideProgress() {
        this.showProgressIndicator = false;
    }
    private info(message: string) {
        this.errorMessage = null;
        this.infoMessage = message;
    }
    private error(message: string) {
        this.infoMessage = null;
        this.errorMessage = message;
    }

}
