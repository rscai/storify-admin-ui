import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CustomCollectionComponent } from './custom-collection.component';
import { CustomCollectionListComponent } from './custom-collection-list/custom-collection-list.component';
import { CustomCollectionDetailComponent } from './custom-collection-detail/custom-collection-detail.component';

import { CustomCollectionDetailResolver } from './custom-collection-detail-resolver.service';
const customCollectionRoutes: Routes =[
  {
    path:'',
    component: CustomCollectionComponent,
    children:[
      {
        path:'',
        component: CustomCollectionListComponent
      },
      {
        path:'create',
        component: CustomCollectionDetailComponent
      },
      {
        path:':id',
        component: CustomCollectionDetailComponent,
        resolve:{
          customCollection: CustomCollectionDetailResolver
        }
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(customCollectionRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    CustomCollectionDetailResolver
  ]
})
export class CustomCollectionRoutingModule { }
