import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalLocationDetailComponent } from './modal-location-detail.component';

describe('ModalLocationDetailComponent', () => {
  let component: ModalLocationDetailComponent;
  let fixture: ComponentFixture<ModalLocationDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalLocationDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalLocationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
