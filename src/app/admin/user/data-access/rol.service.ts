import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolService {
  private http = inject(HttpClient);

  getRol(): Observable<any> {
    return this.http.get<any>('http://localhost:8080/rol/getall');
  }
  saveRol(codRol: any) {
    return this.http.post('http://localhost:8080/rol/save', codRol);
  }
  delete(id: number) {
    return this.http.delete('http://localhost:8080/rol/delete/'+id);
  }
  updateRol(id: number, rol: any) {
    return this.http.post('http://localhost:8080/rol/update/'+id, rol);
  }

}
