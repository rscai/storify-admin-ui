import { NgModule }       from '@angular/core';
import { FormsModule }    from '@angular/forms';
import { CommonModule }   from '@angular/common';

import { CustomCollectionService } from './CustomCollection.service';
import { CustomCollectionRoutingModule } from './custom-collection-routing.module';
import { CustomCollectionListComponent } from './custom-collection-list/custom-collection-list.component';
import { CustomCollectionDetailComponent } from './custom-collection-detail/custom-collection-detail.component';
import { CustomCollectionComponent } from './custom-collection.component';

@NgModule({
  imports:[
    CommonModule,
    FormsModule,
    CustomCollectionRoutingModule
  ],
  declarations:[
    CustomCollectionListComponent,
    CustomCollectionDetailComponent,
    CustomCollectionComponent
  ],
  providers:[
    CustomCollectionService
  ]
})
export class CustomCollectionModule {}
