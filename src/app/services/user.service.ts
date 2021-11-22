import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // eslint-disable-next-line @typescript-eslint/semi
  url='http://127.0.0.1:8000/api/users/'

  constructor(private http: HttpClient) { }

  loadUser(): Observable<any>{
    return this.http.get<any>(this.url);
  }

  login(body): Observable<any>{
    return this.http.post(this.url,body);
  }

  addUser(user: User): Observable<any>{
    return this.http.post(this.url,user);
  }

  editUser(id: number, body): Observable<any>{
    console.log(this.url+id, body);
    return this.http.put(this.url+id, body);
  }

  deleteUser(id: number): Observable<any>{
    return this.http.delete(this.url+id);
  }


}
