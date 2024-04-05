import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { User, UserResponse, UsersResponse } from '../../models/user.model';
import { CacheService } from '../cache/cache.service';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient, private cacheService: CacheService) {}

  getUsers(page: number): Observable<any> {
    const cacheKey = `users-page-${page}`;
    if (this.cacheService.has(cacheKey)) {
      return of(this.cacheService.get(cacheKey));
    }

    return this.http.get(`https://reqres.in/api/users?page=${page}`).pipe(
      map(response => {
        this.cacheService.set(cacheKey, response);
        return response;
      })
    );
  }

  getUser(id: number): Observable<any> {
    const cacheKey = `user-${id}`;
    if (this.cacheService.has(cacheKey)) {
      return of(this.cacheService.get(cacheKey));
    }
  
    return this.http.get(`https://reqres.in/api/users/${id}`).pipe(
      map(response => {
        this.cacheService.set(cacheKey, response);
        return response;
      })
    );
  }
}
