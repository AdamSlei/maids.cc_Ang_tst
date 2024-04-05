import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { User } from '../../models/user.model';
import { CacheService } from '../cache/cache.service';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient, private cacheService: CacheService) {}

  getUsers(page: number): Observable<User[]> {
    const cacheKey = `users-page-${page}`;
    if (this.cacheService.has(cacheKey)) {
      return of(this.cacheService.get(cacheKey));
    }

    return this.http.get<{ data: User[] }>(`https://reqres.in/api/users?page=${page}`).pipe(
      map(response => response.data),
      tap(data => this.cacheService.set(cacheKey, data)),
      catchError(this.handleError<User[]>('getUsers', []))
    );
  }

  getUser(id: number): Observable<User> {
    const cacheKey = `user-${id}`;
    if (this.cacheService.has(cacheKey)) {
      return of(this.cacheService.get(cacheKey));
    }
  
    return this.http.get<{ data: User }>(`https://reqres.in/api/users/${id}`).pipe(
      map(response => response.data),
      tap(data => this.cacheService.set(cacheKey, data)),
      catchError(this.handleError<User>('getUser'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
