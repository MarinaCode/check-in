import { Injectable }    from '@angular/core';
import { Headers, Http, URLSearchParams, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Subject, Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import { environment } from '../../environments/environment';
import { HttpClient } from '../services/http.client';
@Injectable()
export class IndexService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private serverUrl = environment.apiUrl;  // URL to web api
  public notifierSubjectsetLocations: any = new Subject();

  constructor(private http: HttpClient ) {

  }

  public notifyApplyLocations(position: any, name: string) {
    this.notifierSubjectsetLocations.next(position, name);
  }

  getUsers(): Observable<any> {
    return this.http.get(this.serverUrl + "user")
      .map(response=> {
        return response.json();
      })
  }

  checkIn(name, latitude, longitude): Observable<any> {
    return this.http.post(this.serverUrl + "user", JSON.stringify({name: name, lat:latitude, lng:longitude }))
      .map(response=> {
        return response.json();
      })
  }

  updateCheckIn(id, name, latitude, longitude): Observable<any> {
    return this.http.put(this.serverUrl + "user/" + id, JSON.stringify({name: name, lat:latitude, lng:longitude }))
      .map(response=> {
        return response.json();
      })
  }

}
