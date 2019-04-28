import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  API_URL: string = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.API_URL}/product`)
  }

  getProduct(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.API_URL}/product/${id}`)

  }
  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.API_URL}/product/create`, product)
  }

  updateProduct(id: string, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.API_URL}/product/update?productID=${id}`, product)
  }

  deleteProduct(id: string): Observable<Product> {
    return this.http.delete<Product>(`${this.API_URL}/product/delete?productID=${id}`)
  }
}
