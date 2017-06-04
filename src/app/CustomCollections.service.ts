import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HalService } from './hal/service';

import { CustomCollections } from './model/CustomCollections';

import { environment } from '../environments/environment';


@Injectable()
export class CustomCollectionsService extends HalService<CustomCollections> {
  constructor(http: Http){
    super(http,environment.adminRestServiceEndpoint,"custom_collections");
  }
}
