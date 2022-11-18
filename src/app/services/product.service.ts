import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { retry, catchError, map } from 'rxjs/operators';
import { throwError, zip } from 'rxjs';

import { Product, CreateProductDTO, UpdateProductDTO } from './../models/product.model';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = `${environment.api_url}/products`;

  constructor(
    private http: HttpClient
  ) { }

  getAll(limit?: number, offset?: number) {
    let params = new HttpParams();
    if (limit && offset != null) {
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }
    return this.http.get<Product[]>(this.apiUrl, { params })
      .pipe(
        retry(3),
        map(products => products.map(item => {
          return <Product>{
            ...item,
            taxes: item.price >= 0
              ? item.price * .12
              : 0
          }
        }))
      );
  }

  getAllSimple() {
    return this.http.get<Product[]>(this.apiUrl);
  }

  fetchReadAndUpdate(id: string, dto: UpdateProductDTO) {
    return zip(
      this.getOne(id),
      this.update(id, dto)
    );
  }

  getOne(id: string | number) {
    return this.http.get<Product>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === HttpStatusCode.Conflict) {
            return throwError(() => 'Algo esta fallando en el server');
          }
          if (error.status === HttpStatusCode.NotFound) {
            return throwError(() => 'El producto no existe');
          }
          if (error.status === HttpStatusCode.Unauthorized) {
            return throwError(() => 'No estas permitido');
          }
          return throwError(() => 'Ups algo salio mal');
        })
      )
  }

  create(dto: CreateProductDTO) {
    return this.http.post<Product>(this.apiUrl, dto);
  }

  update(id: string | number, dto: UpdateProductDTO) {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, dto);
  }

  delete(id: string | number) {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }
}
