import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceFormUserInfoComponent } from './invoice-form-user-info.component';

describe('InvoiceFormUserInfoComponent', () => {
  let component: InvoiceFormUserInfoComponent;
  let fixture: ComponentFixture<InvoiceFormUserInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceFormUserInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceFormUserInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
