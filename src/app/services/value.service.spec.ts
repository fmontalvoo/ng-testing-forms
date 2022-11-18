import { TestBed, waitForAsync } from '@angular/core/testing';
import { ValueService } from './value.service';

describe('ValueService', () => {
  let service: ValueService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ValueService]
    });
    service = TestBed.inject(ValueService);
  });

  it('Should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Tests for getValue', () => {
    it('Should return the value', () => {
      expect(service.getValue()).toBe('Valor');
    });

    it('Should return the value from Promise using doneFn', (doneFn) => { // Usar doneFn cuando se trabaja con callbacks.
      service.getValueAsPromise()
        .then(value => {
          expect(value).toBe('Valor');
          doneFn();
        });
    });

    it('Should return the value from Promise using async', async () => {
      const value = await service.getValueAsPromise()
      expect(value).toBe('Valor');
    });

    it('Should return the value from Promise using waitForAsync', waitForAsync(() => {
      service.getValueAsPromise()
        .then(value => {
          expect(value).toBe('Valor');
        });
    }));

    it('Should return the value from Observable using doneFn', (doneFn) => { // Usar doneFn cuando se trabaja con callbacks.
      service.getValueAsObservable()
        .subscribe(value => {
          expect(value).toBe('Valor');
          doneFn();
        });
    });

  });

  describe('Tests for setValue', () => {
    it('Should change the value', () => {
      expect(service.getValue()).toBe('Valor');
      service.setValue('Otro valor');
      expect(service.getValue()).toBe('Otro valor');
    });
  });

  // it('',()=>{});
  // it('',()=>{});
});
