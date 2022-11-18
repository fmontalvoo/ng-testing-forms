import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpStatusCode, HTTP_INTERCEPTORS } from '@angular/common/http';

import { CreateProductDTO, Product, UpdateProductDTO } from '../models/product.model';

import { ProductService } from './product.service';
import { TokenInterceptor } from '../interceptors/token.interceptor';

import { generateProduct, generateProducts } from '../data/product.mock';

import { environment } from 'src/environments/environment';
import { TokenService } from './token.service';

describe('ProductService', () => {
  let ts: TokenService;
  let ps: ProductService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        TokenService,
        ProductService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: TokenInterceptor,
          multi: true
        }
      ],
    });
    ts = TestBed.inject(TokenService);
    ps = TestBed.inject(ProductService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    http.verify(); // Verifica y agrega la data de mockData.
  });

  it('should be created', () => {
    expect(ps).toBeTruthy();
  });

  describe('Test for getAllSimple', () => {
    it('Should return a product list', (doneFn) => {
      // Arrange
      const mockData: Product[] = generateProducts();

      // Act
      ps.getAllSimple()
        .subscribe(data => {
          // Assert
          expect(data.length).toEqual(mockData.length);
          doneFn();
        });

      // Http config
      const req = http.expectOne(`${environment.api_url}/products`); // Intercepta la peticion a la url.
      req.flush(mockData); // Reemplaza la data de la peticion con mockData.
      // http.verify(); // Verifica y agrega la data de mockData.
    });
  });

  describe('Test for getAll', () => {
    it('Should return a product list', (doneFn) => {
      // Arrange
      const mockData: Product[] = generateProducts();

      // Act
      ps.getAll()
        .subscribe(data => {
          // Assert
          expect(data.length).toEqual(mockData.length);
          doneFn();
        });

      // Http config
      const req = http.expectOne(`${environment.api_url}/products`); // Intercepta la peticion a la url.
      req.flush(mockData); // Reemplaza la data de la peticion con mockData.
      // http.verify(); // Verifica y agrega la data de mockData.
    });


    it('Should return a product list with taxes', (doneFn) => {
      const mockData: Product[] = [
        ...generateProducts(2)
          .map((prod, i) => ({
            ...prod,
            price: ((i + 1) * 100),
          })),
        {
          ...generateProduct(),
          price: 0
        },
        {
          ...generateProduct(),
          price: -100
        }
      ];

      ps.getAll()
        .subscribe(data => {
          expect(data.length).toEqual(mockData.length);
          expect(data[0].taxes).toEqual(12);
          expect(data[1].taxes).toEqual(24);
          expect(data[2].taxes).toEqual(0);
          expect(data[3].taxes).toEqual(0);
          doneFn();
        });

      // Http config
      const req = http.expectOne(`${environment.api_url}/products`); // Intercepta la peticion a la url.
      req.flush(mockData); // Reemplaza la data de la peticion con mockData.
      // http.verify(); // Verifica y agrega la data de mockData.
    });

    it('Should send query params with a limit in 10 and an offset in 3', (doneFn) => {
      const mockData: Product[] = generateProducts();
      const limit = 10;
      const offset = 5;

      ps.getAll(limit, offset)
        .subscribe(data => {
          expect(data.length).toEqual(mockData.length);
          doneFn();
        });

      const req = http.expectOne(`${environment.api_url}/products?limit=${limit}&offset=${offset}`); // Intercepta la peticion a la url.
      req.flush(mockData); // Reemplaza la data de la peticion con mockData.

      const params = req.request.params;
      expect(params.get('limit')).toEqual(limit.toString());
      expect(params.get('offset')).toEqual(offset.toString());

      // http.verify(); // Verifica y agrega la data de mockData.
    });

  });

  describe('Tests for create products', () => {
    it('Should return a new product', (doneFn) => {
      const mockData = generateProduct();
      const createProduct: CreateProductDTO = {
        price: 21,
        title: 'Product#1',
        images: mockData.images,
        categoryId: 1,
        description: 'Product description',
      };

      ps.create({ ...createProduct })
        .subscribe(prod => {
          expect(prod).toEqual(mockData);
          doneFn();
        });

      // Http config
      const req = http.expectOne(`${environment.api_url}/products`); // Intercepta la peticion a la url.
      req.flush(mockData); // Reemplaza la data de la peticion con mockData.

      expect(req.request.method).toEqual('POST'); // Verifica el metodo utilizado en la llamada al servicio.
      expect(req.request.body).toEqual(createProduct); // Verifica la data enviada al servicio.

      // http.verify(); // Verifica y agrega la data de mockData.
    });
  });

  describe('Tests for update products', () => {
    it('Should return a updated product', (doneFn) => {
      const mockData = generateProduct();
      const updateProduct: UpdateProductDTO = {
        price: 42,
        title: 'Product#2',
        description: 'Product description',
      };

      const productId = mockData.id;

      ps.update(productId, { ...updateProduct })
        .subscribe(prod => {
          expect(prod).toEqual(mockData);
          doneFn();
        });

      // Http config
      const req = http.expectOne(`${environment.api_url}/products/${productId}`); // Intercepta la peticion a la url.

      expect(req.request.method).toEqual('PUT'); // Verifica el metodo utilizado en la llamada al servicio.
      expect(req.request.body).toEqual(updateProduct); // Verifica la data enviada al servicio.

      req.flush(mockData); // Reemplaza la data de la peticion con mockData.
    });
  });

  describe('Tests for delete products', () => {
    it('Should delete a product', (doneFn) => {
      const mockData = true;
      const productId = generateProduct().id;

      ps.delete(productId)
        .subscribe(res => {
          expect(res).toEqual(mockData);
          doneFn();
        });

      // Http config
      const req = http.expectOne(`${environment.api_url}/products/${productId}`); // Intercepta la peticion a la url.

      expect(req.request.method).toEqual('DELETE'); // Verifica el metodo utilizado en la llamada al servicio.

      req.flush(mockData); // Reemplaza la data de la peticion con mockData.
    });
  });

  describe('Test for getOne', () => {
    it('Should return a product', (doneFn) => {
      const mockData = generateProduct();
      const productId = mockData.id;

      ps.getOne(productId)
        .subscribe(prod => {
          expect(prod).toEqual(mockData);
          doneFn();
        });

      // Http config
      const req = http.expectOne(`${environment.api_url}/products/${productId}`); // Intercepta la peticion a la url.
      req.flush(mockData); // Reemplaza la data de la peticion con mockData.

      expect(req.request.method).toEqual('GET');
    });

    it('Should return not found error', (doneFn) => {
      const msgErr = '404';
      const mockError = {
        status: HttpStatusCode.NotFound,
        statusText: msgErr
      };

      const productId = 0;

      ps.getOne(productId)
        .subscribe({
          error(err) {
            expect(err).toEqual('El producto no existe');
            doneFn();
          }
        });

      // Http config
      const req = http.expectOne(`${environment.api_url}/products/${productId}`); // Intercepta la peticion a la url.
      req.flush(msgErr, mockError); // Reemplaza la data de la peticion con mockData.

      expect(req.request.method).toEqual('GET');
    });

    it('Should return unauthorized error', (doneFn) => {
      const msgErr = '401';
      const mockError = {
        status: HttpStatusCode.Unauthorized,
        statusText: msgErr
      };

      const productId = 0;

      ps.getOne(productId)
        .subscribe({
          error(err) {
            expect(err).toEqual('No estas permitido');
            doneFn();
          }
        });

      // Http config
      const req = http.expectOne(`${environment.api_url}/products/${productId}`); // Intercepta la peticion a la url.
      req.flush(msgErr, mockError); // Reemplaza la data de la peticion con mockData.

      expect(req.request.method).toEqual('GET');
    });

    it('Should return unknow error', (doneFn) => {
      const msgErr = '400';
      const mockError = {
        status: HttpStatusCode.BadRequest,
        statusText: msgErr
      };

      const productId = 0;

      ps.getOne(productId)
        .subscribe({
          error(err) {
            expect(err).toEqual('Ups algo salio mal');
            doneFn();
          }
        });

      // Http config
      const req = http.expectOne(`${environment.api_url}/products/${productId}`); // Intercepta la peticion a la url.
      req.flush(msgErr, mockError); // Reemplaza la data de la peticion con mockData.

      expect(req.request.method).toEqual('GET');
    });
  });

  describe('Test for TokenInterceptor', () => {
    it('Should return the token value', () => {
      const token = 'Token.123';
      spyOn(ts, 'getToken').and.returnValue(token);

      ps.getAllSimple()
        .subscribe();

      const req = http.expectOne(`${environment.api_url}/products`); // Intercepta la peticion a la url.
      const headers = req.request.headers;
      expect(headers.get('Authorization')).toBe(`Bearer ${token}`);
    });
  });

});
