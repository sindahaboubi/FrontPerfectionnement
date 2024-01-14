import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Admin } from '../classes/admin';

const URL= environment.baseURL;

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  public authentification(login:string,pwd:string){
    let payLoad=new HttpParams();
    payLoad=payLoad.append('username',login);
    payLoad=payLoad.append("pwd",pwd);
    return this.http.post(URL+"authentificationAdmin.php",payLoad);
  }

  getAdminById(id: number) {
    let payload=new HttpParams();
    payload=payload.append("id",id)
    return this.http.post(URL+"getAdminById.php",payload);
  } 

  putAdmin(data:Admin)
  {
    let payload=new HttpParams();
    payload=payload.append('id',data.id);
    payload=payload.append('nom',data.nom);
    payload=payload.append('prenom',data.prenom);
    payload=payload.append('email',data.email);
    payload=payload.append('mdp',data.mdp);
    payload=payload.append('genre',data.genre);
    payload=payload.append('username',data.username);
    payload=payload.append('adresse',data.adresse);
    payload=payload.append('tel',data.tel);
    payload=payload.append('cin',data.cin);
    return this.http.post(URL+'putAdmin.php',payload);
  }
}
