import { Injectable } from '@angular/core';
import { GenericHttpService } from '@app/generic-http.service';
import { Product } from './product';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends GenericHttpService<Product>{

  constructor(httpClient: HttpClient) { 
    super(httpClient,`products`);
  }
}
