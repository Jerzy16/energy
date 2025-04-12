import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient);

  getUser(): Observable<any> {
    return this.http.get<any>('http://localhost:8080/usuario/getall');
  }

  saveUser(codUsu: any) {
    return this.http.post('http://localhost:8080/usuario/save', codUsu);
  }

  delete(id: number) {
    return this.http.delete('http://localhost:8080/usuario/delete/'+id);
  }

  updateUser(id: number, usuario: any) {
    return this.http.post('http://localhost:8080/usuario/update/'+id, usuario);
  }
}
