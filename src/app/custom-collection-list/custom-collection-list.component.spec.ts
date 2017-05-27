import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomCollectionListComponent } from './custom-collection-list.component';

describe('CustomCollectionListComponent', () => {
  let component: CustomCollectionListComponent;
  let fixture: ComponentFixture<CustomCollectionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomCollectionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomCollectionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
