import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Encadrant } from '../classes/encadrant';

const URL= environment.baseURL;
@Injectable({
  providedIn: 'root'
})
export class EncadrantService {
  directionsURL=environment.baseURL+"getDirections.php";

  authURL = environment.baseURL+"authentificationEnc.php";
  
  constructor(private http:HttpClient) { }

  public inscription(e:Encadrant,fileimage:FormData,h:any){
    fileimage.append('date',e.dateNaiss.toString());
    fileimage.append('nom',e.nom);
    fileimage.append('prenom',e.prenom);
    fileimage.append('genre',e.genre);
    fileimage.append('mail',e.email);
    fileimage.append('pwd',e.mdp);
    fileimage.append('cin',e.cin);
    fileimage.append('adr',e.adresse);
    fileimage.append('tele',e.tel);
    fileimage.append('user',e.username);
    fileimage.append('spec',e.specialite);
    fileimage.append('iddirection',e.dir.toString());
    fileimage.append('choix',"encadrant");
    return this.http.post(URL+"inscriptionEnc.php",fileimage,{headers:h});
  }

  public authentification(login:string,pwd:string){
    let payLoad=new HttpParams();
    payLoad=payLoad.append('username',login);
    payLoad=payLoad.append("pwd",pwd);
    return this.http.post(URL+"authentificationEnc.php",payLoad);
  }

  getEncadrantById(id:number){
    let payload=new HttpParams();
    payload=payload.append('id',id);
    return this.http.post(URL+'getEncadrantById.php',payload);
  }

  putEncadrant(data:Encadrant)
  {
    let payload=new HttpParams();
    payload=payload.append('id',data.id);
    payload=payload.append('email',data.email);
    payload=payload.append('mdp',data.mdp);
    payload=payload.append('username',data.username);
    payload=payload.append('adresse',data.adresse);
    payload=payload.append('tel',data.tel);
    return this.http.post(URL+'putEncadrant.php',payload);
  }

  getEncadrant(){
    return this.http.get(URL+"getAllEncadrants.php");
  }

  deleteEncadrant(id:number){
    let payLoad=new HttpParams();
    payLoad=payLoad.append("id",id);
    return this.http.post(URL+"deleteEncadrant.php",payLoad);
  }

  getDirections(){
    return this.http.get(this.directionsURL);
  } 
}
