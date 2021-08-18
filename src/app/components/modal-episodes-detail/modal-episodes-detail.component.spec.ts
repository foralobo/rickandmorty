import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEpisodesDetailComponent } from './modal-episodes-detail.component';

describe('ModalEpisodesDetailComponent', () => {
  let component: ModalEpisodesDetailComponent;
  let fixture: ComponentFixture<ModalEpisodesDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEpisodesDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEpisodesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
