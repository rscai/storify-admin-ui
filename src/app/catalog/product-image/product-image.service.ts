import { Injectable } from '@angular/core';
import {
    Router, Resolve, RouterStateSnapshot,
    ActivatedRouteSnapshot
} from '@angular/router';

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HalService } from '../../hal/service';
import { ProductImage } from './product-image';
import { environment } from '../../../environments/environment';


@Injectable()
export class ProductImageService extends HalService<ProductImage> {
    constructor(http: HttpClient) {
        super(http, environment.backend.catalog.url, 'productImages');
    }
}

@Injectable()
export class ProductImageDetailResolver implements Resolve<ProductImage> {
    constructor(private service: ProductImageService, private router: Router) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ProductImage> {
        const id = route.params['id'];
        return this.service.findOne(id);
    }
}
