import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import  * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class BaseDeDatosService {

  constructor(private http: HttpClient) { }
  private apiUrl = 'http://localhost:8080';

  obtenerUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/usuarioApi/usuarioSelect`);
  }

  obtenerUsuarioPorID(id:string): Observable<any> {
    return this.http.get(`${this.apiUrl}/usuarioApi/usuarioSelect/`+id);
  }

  obtenerUsuarioPorDNI(dni:string): Observable<any> {
    return this.http.get(`${this.apiUrl}/usuarioApi/usuarioSelect/usuarioDni/`+dni);
  }

  obtenerUsuarioPorEmail(email:string): Observable<any> {
    return this.http.get(`${this.apiUrl}/usuarioApi/usuarioSelect/usuarioEmail/`+email);
  }

  insertarUSuario(datos: any): Observable<any> {
    console.log(datos);
    return this.http.post(`${this.apiUrl}/usuarioApi/usuarioInsertar`, datos);
  }

  encriptarContra(password: string): string {
    const hashedPassword = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
    return hashedPassword;
  }
}
