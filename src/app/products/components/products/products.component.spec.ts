import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { of, defer, async } from 'rxjs';

import { ProductsComponent } from './products.component';
import { ProductComponent } from '../product/product.component';

import { ValueService } from 'src/app/services/value.service';
import { ProductService } from 'src/app/services/product.service';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { generateProducts } from 'src/app/data/product.mock';

import { getText, query, queryById } from 'src/testing';

describe('ProductsComponent', () => {

  let component: ProductsComponent;
  let vs: jasmine.SpyObj<ValueService>;
  let ps: jasmine.SpyObj<ProductService>;
  let fixture: ComponentFixture<ProductsComponent>;

  beforeEach(async () => {
    const spyPs = jasmine.createSpyObj('ProductService', ['getAll']);
    const spyVs = jasmine.createSpyObj('ValueService', ['getValueAsPromise']);

    await TestBed.configureTestingModule({
      declarations: [
        ProductsComponent,
        ProductComponent,
      ],
      providers: [
        { provide: ValueService, useValue: spyVs },
        { provide: ProductService, useValue: spyPs },
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;

    vs = TestBed.inject(ValueService) as jasmine.SpyObj<ValueService>;

    ps = TestBed.inject(ProductService) as jasmine.SpyObj<ProductService>;
    const products = generateProducts(10);
    ps.getAll.and.returnValue(of(products));

    fixture.detectChanges(); // ngOnInit
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have called the method getAll', () => {
    expect(ps.getAll).toHaveBeenCalled();
  });

  describe('Test for getAllProducts', () => {
    it('should return a list of products from the service', () => {
      const products = generateProducts(10);
      const prevCount = component.products.length;
      ps.getAll.and.returnValue(of(products));

      component.getAllProducts();
      fixture.detectChanges();

      // expect(component.products).toEqual(products);
      expect(component.products.length).toEqual(prevCount + products.length);
    });

    it('should change the status from "loading" to "success"', fakeAsync(() => {
      // Arrange
      const products = generateProducts(10);
      ps.getAll.and.returnValue(defer(() => Promise.resolve(products)));
      // Act
      component.getAllProducts();
      fixture.detectChanges();

      // Assert
      expect(component.status).toEqual('loading');
      tick();
      fixture.detectChanges();
      expect(component.status).toEqual('success');
    }));

    it('should change the status from "loading" to "error"', fakeAsync(() => {
      // Arrange
      const products = generateProducts(10);
      ps.getAll.and.returnValue(defer(() => Promise.reject('Error')));
      // Act
      component.getAllProducts();
      fixture.detectChanges();

      // Assert
      expect(component.status).toEqual('loading');
      tick(1000);
      fixture.detectChanges();
      expect(component.status).toEqual('error');
    }));

  });

  describe('test for callPromise', () => {
    it('should call a promise with async', async () => {
      const mockMsg = 'mock message';
      vs.getValueAsPromise.and.returnValue(Promise.resolve(mockMsg));

      await component.callPromise();
      fixture.detectChanges();

      expect(component.response).toEqual(mockMsg);
      expect(vs.getValueAsPromise).toHaveBeenCalled();
    });

    it('should call a promise with fakeAsync', fakeAsync(() => {
      const mockMsg = 'mock message';
      vs.getValueAsPromise.and.returnValue(Promise.resolve(mockMsg));

      component.callPromise();
      tick();
      fixture.detectChanges();

      expect(component.response).toEqual(mockMsg);
      expect(vs.getValueAsPromise).toHaveBeenCalled();
    }));

    it('should call the promise when the button is clicked', fakeAsync(() => {
      const mockMsg = 'mock message';
      vs.getValueAsPromise.and.returnValue(Promise.resolve(mockMsg));

      // const buttonDebug: DebugElement = query(fixture, '[data-testid="btn-call"]');
      const buttonDebug: DebugElement = queryById(fixture, 'btn-call');
      const button = buttonDebug.nativeElement;
      // button.click();
      buttonDebug.triggerEventHandler('click', null);
      tick();
      fixture.detectChanges();

      expect(component.response).toEqual(mockMsg);
      expect(vs.getValueAsPromise).toHaveBeenCalled();
    }));

    it('should call the promise when the button is clicked and display the message', fakeAsync(() => {
      const mockMsg = 'mock message';
      vs.getValueAsPromise.and.returnValue(Promise.resolve(mockMsg));

      // const button: HTMLElement = query(fixture, '[data-testid="btn-call"]').nativeElement;
      const button: HTMLElement = queryById(fixture, 'btn-call').nativeElement;
      button.click();
      tick();
      fixture.detectChanges();

      const pText = getText(fixture, 'msg', true);
      // const p: HTMLElement = fixture.debugElement.query(By.css('p.msg')).nativeElement;

      expect(pText).toEqual(mockMsg);
      expect(vs.getValueAsPromise).toHaveBeenCalled();
    }));

  });

});
