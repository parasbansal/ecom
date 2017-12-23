import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as globs from '../global';

@Injectable()
export class ProductService {

  BaseURL: any = globs.g.server + 'products';

  constructor(
    private http: HttpClient
  ) { }

  getAll(page) {
    return this.http.get(this.BaseURL + '/' + page);
  }

  add(newItem) {
    return this.http.post(this.BaseURL + '/', newItem);
  }

}
