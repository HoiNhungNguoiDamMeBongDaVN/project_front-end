import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatsCustomerComponent } from './chats-customer.component';

describe('ChatsCustomerComponent', () => {
  let component: ChatsCustomerComponent;
  let fixture: ComponentFixture<ChatsCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatsCustomerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatsCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
