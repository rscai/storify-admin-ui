import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomCollectionDetailComponent } from './custom-collection-detail.component';

describe('CustomCollectionDetailComponent', () => {
  let component: CustomCollectionDetailComponent;
  let fixture: ComponentFixture<CustomCollectionDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomCollectionDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomCollectionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
