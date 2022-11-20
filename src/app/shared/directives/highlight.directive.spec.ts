import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighlightDirective } from './highlight.directive';
import { queryAll, queryAllByDirective } from 'src/testing';

@Component({
  template: `
  <h3 class="title" highlight>Directiva</h3>
  <h4 highlight="blue">Color</h4>
  <h5 highlight="red">Valor</h5>
  <p>Parrafo</p>
  <input type="text" [highlight]="color" [(ngModel)]="color" />
  `
})
class HostComponent {
  color = 'green';
}
describe('HighlightDirective from HostComponent', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [
        HostComponent,
        HighlightDirective
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 4 elements with the directive', () => {
    // const elements = fixture.nativeElement.queryAll(By.css('*[highlight]')); // Selecciona cualquier elemento con el atributo 'highlight'.
    const elementsWithDirective = queryAllByDirective(fixture, HighlightDirective);
    const elementsWithoutDirective: DebugElement[] = queryAll(fixture, '*:not([highlight])');

    expect(elementsWithDirective.length).toEqual(4);
    expect(elementsWithoutDirective.length).toEqual(2);
  });

  it('elements should have a background color', () => {
    const elements = fixture.debugElement.queryAll(By.directive(HighlightDirective));

    expect(elements.length).toEqual(4);
    expect(elements[0].nativeElement.style.backgroundColor).toEqual('yellow');
    expect(elements[1].nativeElement.style.backgroundColor).toEqual('blue');
    expect(elements[2].nativeElement.style.backgroundColor).toEqual('red');
  });

  it('element with class .title should have a default color', () => {
    const h3Debug: DebugElement = fixture.debugElement.query(By.css('.title'));
    const h3: HTMLElement = h3Debug.nativeElement;
    const directiveInstance = h3Debug.injector.get(HighlightDirective);

    expect(h3.style.backgroundColor).toEqual(directiveInstance.defaultColor);
  });

  it('should bind the input and change the backgroundColor', () => {
    const inputDebug: DebugElement = fixture.debugElement.query(By.css('input'));
    const input: HTMLInputElement = inputDebug.nativeElement;

    expect(input.style.backgroundColor).toEqual('green');

    input.value = 'red';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.color).toEqual('red');
    expect(input.style.backgroundColor).toEqual('red');
  });

});
