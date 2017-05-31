import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';

@Injectable()
export class HttpClient {
  headers:Headers;
  token: any;

  constructor(private http: Http) {
    this.headers = new Headers({'Content-Type': 'application/json'});
  }

  get(url) {
    return this.http.get(url, {
      headers: this.headers
    });
  }

  post(url, data) {
    //let headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post(url, data, {
      headers: this.headers
    });
  }

  put(url, data) {
    //let headers = new Headers({'Content-Type': 'application/json'});
    return this.http.put(url, data, {
      headers: this.headers
    });
  }
}
