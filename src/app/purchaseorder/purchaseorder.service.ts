import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericHttpService } from '@app/generic-http.service';
import { Purchaseorder } from './purchaseorder';
@Injectable({
  providedIn: 'root'
})
export class PurchaseorderService extends GenericHttpService<Purchaseorder>{
  constructor(httpClient: HttpClient) {
    super(httpClient, `pos`);
  } // constructor
}
