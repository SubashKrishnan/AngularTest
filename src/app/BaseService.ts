import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class BaseService {
    private header = new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, DELETE, PUT,FETCH'
    });

    constructor(private http: HttpClient) { }

    extractData(res: Response) {
        return res.json() || {};
    }

    private formatErrors(error: any) {
        return throwError(error.error);
    }

    get<T>(path: string, params: HttpParams = new HttpParams()): Observable<T> {
        return this.http
            .get<T>(`http://localhost:2494/api/` + path, { params })
            .pipe(catchError(this.formatErrors));
    }

    put<T>(path: string, body: Object = {}): Observable<T> {
        return this.http
            .put<T>(`http://localhost:2494/api/` + path, JSON.stringify(body), {
                headers: this.header
            })
            .pipe(catchError(this.formatErrors));
    }

    post<T>(path: string, body: Object = {}): Observable<T> {
        return this.http
            .post<T>(`http://localhost:2494/api/` + path, JSON.stringify(body), {
                headers: this.header
            })
            .pipe(catchError(this.formatErrors));
    }

    delete<T>(path): Observable<T> {
        return this.http
            .delete<T>(`${environment.apiUrl}${path}`)
            .pipe(catchError(this.formatErrors));
    }


}
