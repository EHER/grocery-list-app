import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDetailsItemsItemComponent } from './list-details-items-item.component';

describe('ListDetailsItemsItemComponent', () => {
  let component: ListDetailsItemsItemComponent;
  let fixture: ComponentFixture<ListDetailsItemsItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListDetailsItemsItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDetailsItemsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
