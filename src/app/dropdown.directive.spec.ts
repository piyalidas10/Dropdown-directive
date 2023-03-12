import { Component, DebugElement, Renderer2, Type } from '@angular/core';
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
        this.countrydata = Countrydata;
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
  let renderer2: Renderer2;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [
        TestComponent,
        DropdownDirective
      ],
      providers: [Renderer2]
    }).createComponent(TestComponent);
    component = fixture.componentInstance;
    renderer2 = fixture.componentRef.injector.get<Renderer2>(Renderer2 as Type<Renderer2>);
    inputEl = fixture.debugElement.query(By.css('.select-box'));
    directive = fixture.debugElement.query(By.directive(DropdownDirective)).injector.get(DropdownDirective) as DropdownDirective;
    ulSelectList = inputEl.query(By.css('.select-box__list'));
    arrowIcon = inputEl.query(By.css('.select-box__icon'));
    selectedOptionText = inputEl.query(By.css('.select-box__input-text'));
    directive.currentFocusableIndex = 0;
    directive.ngAfterViewInit();
    fixture.detectChanges();
  });

  it('choose option from dropdown & pass through @Input() chooseOption', () => {
    directive.chooseOption = 'Manitoba';
    directive.ngOnChanges();
  });

  it('dropdown with click without open', () => {
    inputEl.triggerEventHandler('click', null);
    spyOn(directive, 'dropdownOpen').and.callThrough();
    fixture.detectChanges();
  });

  it('dropdown with click with open', () => {
    ulSelectList.nativeElement.classList.add('open');
    arrowIcon.nativeElement.classList.add('open');
    inputEl.triggerEventHandler('click', null);
    spyOn(directive, 'dropdownClose').and.callThrough();
    fixture.detectChanges();
  });

  it('dropdown with keydown with keycode = 27 or Escape', () => {
    directive.keydownEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    spyOn(directive, 'dropdownClose').and.callThrough();
    fixture.detectChanges();
  });

  it('dropdown with keydown with keycode = 13 or Enter without open class', () => {
    directive.selectedOptionText.innerText = 'Alberta';
    directive.keydownEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    spyOn(directive, 'dropdownOpen').and.callThrough();
    spyOn(directive, 'setFocusableElement').and.callThrough();
    fixture.detectChanges();
  });

  it('dropdown with keydown with keycode = 13 or Enter with open class', () => {
    ulSelectList.nativeElement.classList.add('open');
    arrowIcon.nativeElement.classList.add('open');
    directive.keydownEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    spyOn(directive, 'dropdownClose').and.callThrough();
    fixture.detectChanges();
  });

  it('dropdown with keydown with keycode = 38 or UP', () => {
    directive.keydownEvent(new KeyboardEvent('keydown', { keyCode: 38 }));
    spyOn(directive, 'focusOptionLists').and.callThrough();
    fixture.detectChanges();
  });

  it('dropdown with keydown with keycode = 40 or DOWN with open class', () => {
    directive.currentFocusableIndex = 0;
    ulSelectList.nativeElement.classList.add('open');
    arrowIcon.nativeElement.classList.add('open');
    directive.keydownEvent(new KeyboardEvent('keydown', { keyCode: 40 }));
    spyOn(directive, 'nextFocusableElement').and.callThrough();
    fixture.detectChanges();
  });

  it('dropdown with keyup with keyCode = 27 or Escape', () => {
    directive.keyupEvent(new KeyboardEvent('keyup', { key: 'Escape' }));
    spyOn(directive, 'dropdownClose').and.callThrough();
    fixture.detectChanges();
  });

  it('dropdown with keyup with keyCode = 38 or Up', () => {
    directive.currentFocusableIndex = 1;
    ulSelectList.nativeElement.classList.add('open');
    arrowIcon.nativeElement.classList.add('open');
    directive.keyupEvent(new KeyboardEvent('keyup', { keyCode: 38 }));
    spyOn(directive, 'previousFocusableElement').and.callThrough();
    fixture.detectChanges();
  });
});
