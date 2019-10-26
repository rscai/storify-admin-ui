import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HalService } from '../../hal/service';

import { Product } from './Product';

import { environment } from '../../../environments/environment';


@Injectable()
export class ProductService extends HalService<Product> {
  constructor(http: HttpClient) {
    super(http, environment.backend.catalog.url, 'products');
  }
}
