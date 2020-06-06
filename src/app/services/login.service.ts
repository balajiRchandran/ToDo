import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { Observable} from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }

  checkUsers(u,p): Observable<any> {
    return this.http.post<any>(baseURL + 'login/',{user:u,pass:p})
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  addUser(u,n,p): Observable<any> {
    return this.http.post<any>(baseURL + 'register/',{user:u,name:n,pass:p})
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }
}
