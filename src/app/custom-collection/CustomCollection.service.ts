import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HalService } from 'app/hal/service';

import { CustomCollection } from './CustomCollection';

import { environment } from 'environments/environment';


@Injectable()
export class CustomCollectionService extends HalService<CustomCollection> {
  constructor(http: Http){
    super(http,environment.adminRestServiceEndpoint,"custom_collections");
  }
}
