import { DebugElement, Type } from "@angular/core"; // Representa cualquier CustomComponent de Angular.
import { By } from "@angular/platform-browser";
import { ComponentFixture } from "@angular/core/testing";

export function query<T>(fixture: ComponentFixture<T>, selector: string) {
  const debugElement = fixture.debugElement.query(By.css(selector));
  if (!debugElement) throw `query: Element with selector "${selector}" not found`;
  return debugElement;
}

export function queryById<T>(fixture: ComponentFixture<T>, testId: string) {
  return query(fixture, `[data-testid="${testId}"]`);
}

export function queryAll<T>(fixture: ComponentFixture<T>, selector: string) {
  const debugElements: DebugElement[] = fixture.debugElement.queryAll(By.css(selector));
  if (!debugElements) throw `queryAll: Elements with selector "${selector}" not found`;
  return debugElements;
}

export function queryAllByDirective<T, D>(fixture: ComponentFixture<T>, directive: Type<D>) {
  const debugElements: DebugElement[] = fixture.debugElement.queryAll(By.directive(directive));
  if (!debugElements) throw `queryAll: Elements with directive "${directive.name}" not found`;
  return debugElements;
}

export function getText<T>(
  fixture: ComponentFixture<T>,
  selector: string,
  withTestId: boolean = false
) {
  let debugElement: DebugElement;

  if (withTestId)
    debugElement = queryById(fixture, selector);
  else
    debugElement = query(fixture, selector);

  const nativeElement: HTMLElement = debugElement.nativeElement;
  return nativeElement.textContent;
}
