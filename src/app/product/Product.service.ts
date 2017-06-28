import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HalService } from 'app/hal/service';

import { Product } from './Product';

import { environment } from 'environments/environment';


@Injectable()
export class ProductService extends HalService<Product> {
  constructor(http: Http){
    super(http,environment.adminRestServiceEndpoint,"products");
  }
}
