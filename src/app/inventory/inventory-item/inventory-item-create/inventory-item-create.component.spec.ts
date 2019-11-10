import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryItemCreateComponent } from './inventory-item-create.component';

describe('InventoryItemCreateComponent', () => {
  let component: InventoryItemCreateComponent;
  let fixture: ComponentFixture<InventoryItemCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryItemCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryItemCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
