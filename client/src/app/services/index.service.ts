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
  public notifierSubjectUpdateList: any = new Subject();

  constructor(private http: HttpClient ) {
  }

  public notifyApplyLocations(position) {
    this.notifierSubjectsetLocations.next(position);
  }

  public notifyUpdateList() {
    this.notifierSubjectUpdateList.next();
  }

  getUsers(lat, lng, id): Observable<any> {
    return this.http.post(this.serverUrl + "user/nearby", JSON.stringify({lat: lat, lng: lng, id: id}))
      .map(response=> {
        return response.json();
      })
  }

  checkIn(name, latitude, longitude): Observable<any> {
    return this.http.post(this.serverUrl + "user", JSON.stringify({name: name, lat: latitude, lng: longitude }))
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
