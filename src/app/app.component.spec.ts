import { DebugElement } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { Countrydata } from './mockdata/countrydata';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let inputEl: DebugElement;
  let ulSelectList: DebugElement;
  let liSelectListLabel: DebugElement;
  let selectedOptionText: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    inputEl = fixture.debugElement.query(By.css('.select-box'));
    ulSelectList = inputEl.query(By.css('.select-box__list'));
    liSelectListLabel = ulSelectList.query(By.css('.select-box__option'));
    selectedOptionText = inputEl.query(By.css('.select-box__input-text'));
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call fetchSelectedValue', () => {    
    inputEl.triggerEventHandler('selectedOptionChange', null);
    spyOn(component, 'fetchSelectedValue').and.callThrough();
    fixture.detectChanges();
  });

  it('should call setChooseOption', () => {
    liSelectListLabel.triggerEventHandler('click', {...Countrydata[2]});
    spyOn(component, 'setChooseOption').withArgs({...Countrydata[2]}).and.callThrough();
    fixture.detectChanges();
  });
});
