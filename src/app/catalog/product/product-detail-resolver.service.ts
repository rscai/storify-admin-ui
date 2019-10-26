import { Injectable }             from '@angular/core';
import { Router, Resolve, RouterStateSnapshot,
         ActivatedRouteSnapshot } from '@angular/router';

import { Product } from './Product';
import { ProductService } from './Product.service';
import { Observable } from 'rxjs';

@Injectable()
export class ProductDetailResolver implements Resolve<Product> {
  constructor(private service: ProductService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product> {
    let id = route.params['id'];
    return this.service.findOne(id);
  }
}
