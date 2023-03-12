import { Directive, HostListener, ElementRef, Renderer2, AfterViewInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective implements AfterViewInit, OnChanges {
  @Input() chooseOption: string;
  focusElementLi: HTMLElement;
  currentFocusableIndex: number;
  selectedOptionText: HTMLElement;
  ulSelectList: HTMLElement;
  selectBox: HTMLElement;
  arrowIcon: HTMLElement;
  focusableLists: any;
  @Output() selectedOptionChange = new EventEmitter<any>();

  constructor(private el: ElementRef, private ren: Renderer2) { }

  ngAfterViewInit() {
    this.selectBox = this.el.nativeElement;
    this.ulSelectList = this.el.nativeElement.querySelector('.select-box__list');
    this.arrowIcon = this.el.nativeElement.querySelector('.select-box__icon');
    this.selectedOptionText = this.el.nativeElement.querySelector('.select-box__input-text');
    this.focusableLists = this.ulSelectList.children;
    this.setTabIndex(this.selectBox, this.selectedOptionText);    
  }

  @HostListener('click', ['$event']) clickEvent(event: any) {
    /* Click on select box options will open and close against click (Using renderer2 listen method) */
    console.log('ulSelectList => ', this.ulSelectList);
    if (this.ulSelectList.classList.contains('open')) {
      this.dropdownClose(this.ulSelectList, this.arrowIcon);
    } else {
      this.dropdownOpen(this.ulSelectList, this.arrowIcon);
    }
  }

  @HostListener('keydown', ['$event']) keydownEvent(event: any) {
    console.log('keydown => ', event);
      if (event.keyCode === 27 || event.key === 'Escape' || event.which === 27) { // ESCAPE key from keyboard
        this.dropdownClose(this.ulSelectList, this.arrowIcon);
        event.preventDefault();
      } else if (event.keyCode === 13 || event.key === 'Enter' || event.which === 13) { // ENTER key from keyboard
        if (this.ulSelectList.classList.contains('open')) {
          this.dropdownClose(this.ulSelectList, this.arrowIcon);
        } else {
          this.dropdownOpen(this.ulSelectList, this.arrowIcon);
          this.setFocusableElement(this.selectedOptionText);
        }
        event.preventDefault();
      } else if (event.keyCode === 38 || event.which === 38) { // UP key from keyboard
        this.focusOptionLists(this.ulSelectList);
        event.preventDefault();
      } else if (event.keyCode === 40 || event.which === 40) { // DOWN key from keyboard
        if (this.ulSelectList.classList.contains('open')) {
          if (this.currentFocusableIndex < this.focusableLists.length - 1) {
            this.nextFocusableElement();
          }
        }
      } else {

      }
  }

  @HostListener('keyup', ['$event']) keyupEvent(event: any) {
      /* Close selectbox downdown using ESCAPE key from keyboard */
      if (event.keyCode === 27 || event.key === 'Escape' || event.which === 27) {
        this.dropdownClose(this.ulSelectList, this.arrowIcon);
        event.preventDefault();
      } else if (event.keyCode === 38 || event.which === 38) { // UP key from keyboard
        if (this.ulSelectList.classList.contains('open')) {
          if (this.currentFocusableIndex > 0) {
            this.previousFocusableElement();
          }
        }
      } else {

      }
  }

  ngOnChanges() {
    console.log('chooseOption => ', this.chooseOption);
    if (this.chooseOption !== undefined) {
      this.selectedOptionText.innerText = this.chooseOption;
    }
  }

  dropdownOpen(ulSelectList: any, arrowIcon: any) {
    ulSelectList.classList.add('open');
    arrowIcon.classList.add('open');
  }

  dropdownClose(ulSelectList: HTMLElement, arrowIcon: HTMLElement) {
    ulSelectList.classList.remove('open');
    arrowIcon.classList.remove('open');
  }

  changeSelectedText(val: string) {
    this.selectedOptionText.innerText = val;
  }

  setTabIndex(selectBox: HTMLElement, selectedOptionText: HTMLElement) {
    this.ren.setAttribute(selectBox, 'tabindex', '-1');
    this.ren.setAttribute(selectedOptionText, 'tabindex', '0');
  }

  focusOptionLists(ulSelectList: HTMLElement) {
    console.log('focussableElements => ', ulSelectList.children);
    for (let i = 0; i < ulSelectList.children.length; i++) {
      this.ren.setAttribute(ulSelectList.children[i], 'tabindex', '-1');
    }
  }

  setFocusableElement(selectedOptionText: HTMLElement) {
    Array.from(this.focusableLists).forEach((element: any, index) => {
      console.log('PIYALI => ', selectedOptionText, element);
      if (selectedOptionText.innerText === element['innerText']) {
        this.focusableLists[index].focus();
        this.currentFocusableIndex = index;
      }
    });
  }

  nextFocusableElement() {
    console.log('currentFocusableIndex => ', this.currentFocusableIndex);
    if (this.currentFocusableIndex < this.focusableLists.length - 1) {
      this.focusableLists[this.currentFocusableIndex + 1].focus();
      this.currentFocusableIndex ++;
      this.changeSelectedText(this.focusableLists[this.currentFocusableIndex].innerText);
      this.selectedOptionChange.emit(this.focusableLists[this.currentFocusableIndex].innerText);
    }
  }

  previousFocusableElement() {
    if (this.currentFocusableIndex > 0) {
      this.focusableLists[this.currentFocusableIndex - 1].focus();
      this.currentFocusableIndex --;
      this.changeSelectedText(this.focusableLists[this.currentFocusableIndex].innerText);
      this.selectedOptionChange.emit(this.focusableLists[this.currentFocusableIndex].innerText);
    }
  }

}
