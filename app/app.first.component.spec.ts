import { FirstComponent } from './app.first.component';

import { TestBed } from '@angular/core/testing';

import { By }             from '@angular/platform-browser';

////////  SPECS  /////////////

/// Delete this
describe('Smoke test', () => {
  it('should run a passing test', () => {
    expect(true).toEqual(true, 'should pass');
  });
});

describe('FirstComponent with TCB', function () {
  beforeEach(() => {
    TestBed.configureTestingModule({declarations: [FirstComponent]});
  });

  it('should instantiate component', () => {
    let fixture = TestBed.createComponent(FirstComponent);
    expect(fixture.componentInstance instanceof FirstComponent).toBe(true, 'should create AppComponent');
  });

  it('should have expected <h1> text', () => {
    let fixture = TestBed.createComponent(FirstComponent);
    fixture.detectChanges();

    let h1 = fixture.debugElement.query(el => el.name === 'h1').nativeElement;  // it works

        h1 = fixture.debugElement.query(By.css('h1')).nativeElement;            // preferred

    expect(h1.innerText).toMatch(/first component/i, '<h1> should say something about "First component"');
  });
});