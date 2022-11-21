import { DebugElement } from "@angular/core";
import { ComponentFixture } from "@angular/core/testing";
import { query, queryById } from "./finders";

export function setInputValue<T>(
  fixture: ComponentFixture<T>,
  value: string,
  selector: string,
  withTestId: boolean = false
) {
  let debugElement: DebugElement;

  if (withTestId)
    debugElement = queryById(fixture, selector);
  else
    debugElement = query(fixture, selector);

  const nativeElement: HTMLInputElement = debugElement.nativeElement;

  nativeElement.value = value;
  nativeElement.dispatchEvent(new Event('input')); // Rellena el campo de texto(input).
  nativeElement.dispatchEvent(new Event('blur')); // Desenfoca el campo de texto(input).
}

export function setCheckValue<T>(
  fixture: ComponentFixture<T>,
  checked: boolean,
  selector: string,
  withTestId: boolean = false
) {
  let debugElement: DebugElement;

  if (withTestId)
    debugElement = queryById(fixture, selector);
  else
    debugElement = query(fixture, selector);

  const nativeElement: HTMLInputElement = debugElement.nativeElement;

  nativeElement.checked = checked;
  nativeElement.dispatchEvent(new Event('change'));
  nativeElement.dispatchEvent(new Event('blur'));
}

export function setSelectValue<T>(
  fixture: ComponentFixture<T>,
  value: string,
  selector: string,
  withTestId: boolean = false
) {
  let debugElement: DebugElement;

  if (withTestId)
    debugElement = queryById(fixture, selector);
  else
    debugElement = query(fixture, selector);

  const nativeElement: HTMLSelectElement = debugElement.nativeElement;

  nativeElement.value = value;
  nativeElement.dispatchEvent(new Event('change'));
  nativeElement.dispatchEvent(new Event('blur'));
}
