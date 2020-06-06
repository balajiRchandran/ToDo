import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { Observable} from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class AddtaskService {

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }

  addTask(u,t,d,l,p):Observable<any>{
    return this.http.post<any>(baseURL + 'addtask/'+u+'/',{task:t,due:d,label:l,priority:p})
      .pipe(catchError(this.processHTTPMsgService.handleError))
  }

  addLabel(u,l):Observable<any>{
    return this.http.patch<any>(baseURL+'addlabels/'+u+'/',{label:l})
    .pipe(catchError(this.processHTTPMsgService.handleError))
  }

  getLabel(u):Observable<string[]>{
    return this.http.get<string[]>(baseURL+'userlabels/'+u+'/')
    .pipe(catchError(this.processHTTPMsgService.handleError))
  }
}
