import { Component, OnInit, HostBinding } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Link, HalCollection } from '../../../hal/hal';
import { Product } from '../Product';
import { ProductService } from '../Product.service';
import { ProductImageService } from '../../product-image/product-image.service';
import { ProductImage } from '../../product-image/product-image';

@Component({
  selector: 'div[catalog-product-detail].container-fluid',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  entity: Product;
  images: ProductImage[];
  editTitle: string;
  infoMessage: string;
  errorMessage: string;
  showProgressIndicator = false;
  progress: number;
  tagString: string;
  imageCollection: HalCollection<ProductImage>;
  private mode: string;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private service: ProductService,
    private imageService: ProductImageService) {

  }

  ngOnInit() {
    this.imageService.collection(0, 10).subscribe(
      (collection) => this.imageCollection = collection
    );
    if (this.route.snapshot.url[0].path == 'create') {
      this.mode = 'CREATE';
      this.editTitle = 'New';
      this.entity = new Product();
      this.entityTagsToTagString(this.entity);
      this.images = new Array();
    } else {
      this.mode = 'UPDATE';
      this.editTitle = 'Edit';
      this.route.data
        .subscribe((data: { product: Product }) => {
          this.entity = data.product;
          this.entityTagsToTagString(this.entity);
          this.imageService.collectionLink(data.product._links.images).subscribe(
            (collection: HalCollection<ProductImage>) => this.images = collection._embedded.productImages,
            error => this.images = new Array()
          );
        });
    }
  }

  private entityTagsToTagString(product: Product) {
    if (product.tags) {
      this.tagString = this.entity.tags.join(',');
    }
  }

  tagsToString(entity: Product) {
    return entity.tags.join(',');
  }

  imageLinkToSrc(imageLink: Link) {
    return this.imageService.findOneByLink(imageLink).subscribe((image) => image.src);
  }

  onImageCollectionPrev(event: any) {
    this.imageService.collectionLink(this.imageCollection._links.prev).subscribe(
      (collection: HalCollection<ProductImage>) => this.imageCollection = collection
    );
    event.preventDefault();
  }

  onImageCollectionNext(event: any) {
    this.imageService.collectionLink(this.imageCollection._links.next).subscribe(
      (collection: HalCollection<ProductImage>) => this.imageCollection = collection
    );
    event.preventDefault();
  }

  onAddImage(image: ProductImage) {
    this.images = this.images.concat(image);
  }
  
  onSave() {
    console.log('on save');
    if (this.tagString) {
      this.entity.tags = this.tagString.split(',');
    }
    this.showProgress(.55);
    if (this.mode == 'CREATE') {
      this.entity.images = this.images.map((image: ProductImage) => image._links.self.href);
      this.service.create(this.entity)
        .subscribe(createdOne => {
          this.entity = createdOne;
          this.entityTagsToTagString(this.entity);
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
          this.entity = updatedOne;
          this.entityTagsToTagString(this.entity);
          this.service.updateLink(this.entity._links.images, this.images.map(
            (image: ProductImage) => image._links.self
          )).subscribe(
            (            _: any) => {
              this.hideProgress();
              this.info('Updated Product successfully.');
            },
            (            error: any) => {
              this.hideProgress();
              this.error('Updated Product failed!');
            }
          );
        },
          error => {
            this.hideProgress();
            this.error('Updated Product failed!');
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
