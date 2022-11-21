import { DebugElement } from "@angular/core";
import { ComponentFixture } from "@angular/core/testing";
import { query, queryById } from "./finders";

/**
 * Lanza el evento (click) de Angular.
 *
 * `<button (click)="onClick()"></button>`
 * @param fixture
 * @param selector
 * @param withTestId
 * @param event
 */
export function clickEvent<T>(
  fixture: ComponentFixture<T>,
  selector: string,
  withTestId: boolean = false,
  event: unknown = null
) {
  let debugElement: DebugElement;

  if (withTestId)
    debugElement = queryById(fixture, selector);
  else
    debugElement = query(fixture, selector);

  debugElement.triggerEventHandler('click', event);
}

/**
 * Realiza un click al elemento nativo de HTML.
 * @param fixture
 * @param selector
 * @param withTestId
 */
export function clickElement<T>(
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
  nativeElement.click();
}
