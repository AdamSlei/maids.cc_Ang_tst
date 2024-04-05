import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User, UserResponse, UsersResponse } from '../../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  getUsers(page: number): Observable<User[]> {
    return this.http
      .get<UsersResponse>(`https://reqres.in/api/users?page=${page}`)
      .pipe(map((response) => response.data));
  }

  getUser(id: number): Observable<User> {
    return this.http
      .get<UserResponse>(`https://reqres.in/api/users/${id}`)
      .pipe(map((response) => response.data));
  }
}
