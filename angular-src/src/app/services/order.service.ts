import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as globs from '../global';

@Injectable()
export class OrderService {

  BaseURL: any = globs.g.server + 'orders';

  constructor(
    private http: HttpClient
  ) { }

  getAll() {
    return this.http.get(this.BaseURL + '/');
  }

  add(newItem) {
    return this.http.post(this.BaseURL + '/', newItem);
  }

  getLocation(lat, lng) {
    return this.http.get('http://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lng + '&sensor=true');
  }

}
