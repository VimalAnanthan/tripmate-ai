import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestionChips } from './suggestion-chips';

describe('SuggestionChips', () => {
  let component: SuggestionChips;
  let fixture: ComponentFixture<SuggestionChips>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuggestionChips]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuggestionChips);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
