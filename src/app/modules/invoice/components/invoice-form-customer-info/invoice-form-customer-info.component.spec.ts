import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceFormCustomerInfoComponent } from './invoice-form-customer-info.component';

describe('InvoiceFormCustomerInfoComponent', () => {
  let component: InvoiceFormCustomerInfoComponent;
  let fixture: ComponentFixture<InvoiceFormCustomerInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceFormCustomerInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceFormCustomerInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
