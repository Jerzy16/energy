import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient);

  getUser(): Observable<any> {
    return this.http.get<any>('http://localhost:8080/user/getall');
  }

  saveUser(user: any) {
    return this.http.post('http://localhost:8080/user/save', user);
  }

  delete(id: number) {
    return this.http.delete('http://localhost:8080/user/'+id);
  }

  updateUser(id: number, user: any) {
    return this.http.post('http://localhost:8080/user/save/'+id, user);
  }
}
