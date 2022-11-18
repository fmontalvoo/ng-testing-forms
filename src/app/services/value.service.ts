import { Injectable } from '@angular/core';

import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValueService {

  private value = 'Valor';

  constructor() { }

  setValue(value: string) {
    this.value = value;
  }

  getValue() {
    return this.value;
  }

  getValueAsPromise() {
    return Promise.resolve(this.value);
  }

  getValueAsObservable() {
    return of(this.value);
  }
}
