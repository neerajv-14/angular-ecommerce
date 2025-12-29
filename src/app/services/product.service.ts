import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Product } from '../../common/product';
import { ProductCategory } from '../../common/product-category';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  private baseUrl = "http://localhost:8080/api/products";
  private categoryUrl = "http://localhost:8080/api/product-category";
  constructor(private http: HttpClient) { }

  getProductList(categoryId:number): Observable<Product [] >{
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${categoryId}`;
    return this.http.get<GetResponseProduct>(searchUrl).pipe(
      map(response => response._embedded.products));
  }

  getProductListPaginate(categoryId:number,thePage:number,thePageSize:number): Observable<GetResponseProduct>{
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${categoryId}` + `&page=${thePage}&size=${thePageSize}`;
    return this.http.get<GetResponseProduct>(searchUrl);
  }

  getProductCategories(): Observable<ProductCategory []> {
    
    return this.http.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory));
  }

  searchProducts(keyword: string | null): Observable<Product [] > {
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${keyword}`;
    return this.http.get<GetResponseProduct>(searchUrl).pipe(
      map(response => response._embedded.products));
  }

  searchProductsPaginate(thePageNumber:number, thePageSize:number,  keyword: string | null): Observable<GetResponseProduct> {
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${keyword}`+`&page=${thePageNumber}&size=${thePageSize}`;
    return this.http.get<GetResponseProduct>(searchUrl);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${id}`);
  }

}

interface GetResponseProduct {
  _embedded:{
    products: Product []
  },
  page:{
    size: number,
    totalElements:number,
    totalPages:number,
    number:number
  }
}

interface GetResponseProductCategory {
  _embedded:{
    productCategory: ProductCategory []
  }
}


