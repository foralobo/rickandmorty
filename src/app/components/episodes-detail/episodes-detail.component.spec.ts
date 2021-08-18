import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpisodesDetailComponent } from './episodes-detail.component';

describe('EpisodesDetailComponent', () => {
  let component: EpisodesDetailComponent;
  let fixture: ComponentFixture<EpisodesDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EpisodesDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EpisodesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
