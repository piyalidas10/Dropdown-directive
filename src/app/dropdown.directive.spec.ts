import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DropdownDirective } from './dropdown.directive';
import { Countrydata } from './mockdata/countrydata';
import { DropdownOption } from './model/dropdown-option';

@Component({
  template: `
  <div class="select-box" appDropdown [chooseOption] = "chooseOptName" (selectedOptionChange)="fetchSelectedValue($event)">
      <div class="select-box__value">
        <input class="select-box__input" type="radio" value="{{countrydata[0].abbreviation}}" name="{{countrydata[0].abbreviation}}"
          checked="checked">
        <p class="select-box__input-text">{{countrydata[0].name}}</p>
        <img class="select-box__icon" src="http://cdn.onlinewebfonts.com/svg/img_295694.svg" alt="Arrow Icon" aria-hidden="true">
      </div>
      <ul class="select-box__list">
        <li *ngFor="let opt of countrydata; let i = index" tabIndex="{{i}}">
          <label class="select-box__option" (click)="setChooseOption(opt)">{{opt.name}}</label>
        </li>
      </ul>
    </div>
  `
})
class TestComponent {
  countrydata: DropdownOption[] = [];
    chooseOpt: DropdownOption;
    chooseOptName: string;
    constructor() {
        this.countrydata = [{
            'name': 'Alberta',
            'abbreviation': 'AB'
          },
          {
            'name': 'British Columbia',
            'abbreviation': 'BC'
          },
          {
            'name': 'Manitoba',
            'abbreviation': 'MB'
          },
          {
            'name': 'New Brunswick',
            'abbreviation': 'NB'
          },
          {
            'name': 'Newfoundland and Labrador',
            'abbreviation': 'NL'
          },
          {
            'name': 'Nova Scotia',
            'abbreviation': 'NS'
          },
          {
            'name': 'Northwest Territories',
            'abbreviation': 'NT'
          },
          {
            'name': 'Nunavut',
            'abbreviation': 'NU'
          },
          {
            'name': 'Ontario',
            'abbreviation': 'ON'
          },
          {
            'name': 'Prince Edward Island',
            'abbreviation': 'PE'
          },
          {
            'name': 'Quebec',
            'abbreviation': 'QC'
          },
          {
            'name': 'Saskatchewan',
            'abbreviation': 'SK'
          },
          {
            'name': 'Yukon',
            'abbreviation': 'YT'
          }
        ];
    }
    setChooseOption(opt: DropdownOption) {
      this.chooseOpt = opt;
      this.chooseOptName = opt.name;
    }
    fetchSelectedValue(event: DropdownOption) {
      this.chooseOpt = event;
      this.chooseOptName = event.name;
    }
}

describe('DropdownDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let inputEl: DebugElement;
  let directive: DropdownDirective;
  let ulSelectList: DebugElement;
  let selectedOptionText: DebugElement;
  let arrowIcon: DebugElement;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [
        TestComponent,
        DropdownDirective
      ],
    }).createComponent(TestComponent);
    component = fixture.componentInstance;
    inputEl = fixture.debugElement.query(By.css('.select-box'));
    directive = fixture.debugElement.query(By.directive(DropdownDirective)).injector.get(DropdownDirective) as DropdownDirective;
    ulSelectList = inputEl.query(By.css('.select-box__list'));
    arrowIcon = inputEl.query(By.css('.select-box__icon'));
    selectedOptionText = inputEl.query(By.css('.select-box__input-text'));
  });

  it('dropdown with click without open', () => {
    directive.ngAfterViewInit();
    inputEl.triggerEventHandler('click', null);
    spyOn(directive, 'dropdownOpen').and.callThrough();
    fixture.detectChanges();
  });

  it('dropdown with click with open', () => {
    directive.ngAfterViewInit();
    ulSelectList.nativeElement.classList.add('open');
    arrowIcon.nativeElement.classList.add('open');
    inputEl.triggerEventHandler('click', null);
    spyOn(directive, 'dropdownClose').and.callThrough();
    fixture.detectChanges();
  });

  it('dropdown with keydown with keycode = 27 or Escape', () => {
    directive.ngAfterViewInit();
    directive.keydownEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    spyOn(directive, 'dropdownClose').and.callThrough();
    fixture.detectChanges();
  });

  it('dropdown with keydown with keycode = 13 or Enter without open class', () => {
    directive.ngAfterViewInit();
    directive.selectedOptionText.innerText = 'Alberta';
    directive.keydownEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    spyOn(directive, 'dropdownOpen').and.callThrough();
    spyOn(directive, 'setFocusableElement').and.callThrough();
    fixture.detectChanges();
  });

  it('dropdown with keydown with keycode = 13 or Enter with open class', () => {
    directive.ngAfterViewInit();
    ulSelectList.nativeElement.classList.add('open');
    arrowIcon.nativeElement.classList.add('open');
    directive.keydownEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    spyOn(directive, 'dropdownClose').and.callThrough();
    fixture.detectChanges();
  });

  it('dropdown with keydown with keycode = 38 or UP', () => {
    directive.ngAfterViewInit();
    directive.keydownEvent(new KeyboardEvent('keydown', { keyCode: 38 }));
    spyOn(directive, 'focusOptionLists').and.callThrough();
    fixture.detectChanges();
  });

  it('dropdown with keydown with keycode = 40 or DOWN with open class', () => {
    directive.ngAfterViewInit();
    ulSelectList.nativeElement.classList.add('open');
    arrowIcon.nativeElement.classList.add('open');
    directive.keydownEvent(new KeyboardEvent('keydown', { keyCode: 40 })); 
    spyOn(directive, 'nextFocusableElement').and.callThrough();
    directive.currentFocusableIndex = 1;
    // directive.focusableLists = Countrydata as HTMLElement;
    const focusableLists = ulSelectList.children;
    Array.from(focusableLists).forEach((element: any, index) => {
      expect(selectedOptionText.nativeElement.innerText).toBe(element['innerText']);
    });
    fixture.detectChanges();
  });

  it('dropdown with keyup with keyCode = 27 or Escape', () => {
    directive.ngAfterViewInit();
    directive.keyupEvent(new KeyboardEvent('keyup', { key: 'Escape' }));
    spyOn(directive, 'dropdownClose').and.callThrough();
    fixture.detectChanges();
  });

  it('dropdown with keyup with keyCode = 38 or Up', () => {
    directive.ngAfterViewInit();
    ulSelectList.nativeElement.classList.add('open');
    arrowIcon.nativeElement.classList.add('open');
    directive.keyupEvent(new KeyboardEvent('keyup', { keyCode: 38 }));
    directive.currentFocusableIndex = 1;
    spyOn(directive, 'previousFocusableElement').and.callThrough();
    fixture.detectChanges();
  });
});
