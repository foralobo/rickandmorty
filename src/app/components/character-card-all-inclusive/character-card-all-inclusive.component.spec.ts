import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterCardAllInclusiveComponent } from './character-card-all-inclusive.component';

describe('CharacterCardAllInclusiveComponent', () => {
  let component: CharacterCardAllInclusiveComponent;
  let fixture: ComponentFixture<CharacterCardAllInclusiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharacterCardAllInclusiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterCardAllInclusiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
