import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { Observable} from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import {Task} from '../shared/Task'
@Injectable({
  providedIn: 'root'
})
export class TodayService {

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }

    todayTask(u): Observable<Task[]> {
      return this.http.get<Task[]>(baseURL + 'today/'+u+'/')
        .pipe(catchError(this.processHTTPMsgService.handleError));
    }
    updateTask(u,i,s):Observable<Task[]>{
      return this.http.patch<Task[]>(baseURL + 'update/'+u+'/',{task:i,status:s})
      .pipe(catchError(this.processHTTPMsgService.handleError));
    }
    upcomingTask(u) : Observable<Task[]>{
      return this.http.get<Task[]>(baseURL+'upcoming/'+u+'/')
        .pipe(catchError(this.processHTTPMsgService.handleError))
    }
    archivedTask(u) : Observable<Task[]>{
      return this.http.get<Task[]>(baseURL+'archived/'+u+'/')
        .pipe(catchError(this.processHTTPMsgService.handleError))
    }
    deleteTask(u,i):Observable<Task[]>{
      return this.http.delete<Task[]>(baseURL + 'delete/'+u+'/'+i+'/')
      .pipe(catchError(this.processHTTPMsgService.handleError));
    }
}
