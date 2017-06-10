import { Injectable }             from '@angular/core';
import { Router, Resolve, RouterStateSnapshot,
         ActivatedRouteSnapshot } from '@angular/router';

import { CustomCollection } from './CustomCollection';
import { CustomCollectionService } from './CustomCollection.service';

@Injectable()
export class CustomCollectionDetailResolver implements Resolve<CustomCollection> {
  constructor(private service: CustomCollectionService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<CustomCollection> {
    let id = route.params['id'];

    return this.service.findOne(id).then(customCollection => {
      if (customCollection) {
        return customCollection;
      } else { // id not found
        this.router.navigate(['/custom-collection']);
        return null;
      }
    });
  }
}
