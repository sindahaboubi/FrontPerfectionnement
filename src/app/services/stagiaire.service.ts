import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Stagiaire } from '../classes/stagiaire';

const URL= environment.baseURL;
@Injectable({
  providedIn: 'root'
})
export class StagiaireService {

  authURL = environment.baseURL+"authentification.php";

  constructor(private http: HttpClient) { }
 
  public inscription(s:Stagiaire,fileimage:FormData,h:any){
    fileimage.append('nom',s.nom);
    fileimage.append('date',s.dateNaiss.toString());
    fileimage.append('nom',s.nom);
    fileimage.append('prenom',s.prenom);
    fileimage.append('genre',s.genre);
    fileimage.append('mail',s.email);
    fileimage.append('pwd',s.mdp);
    fileimage.append('cin',s.cin);
    fileimage.append('adr',s.adresse);
    fileimage.append('tele',s.tel);
    fileimage.append('user',s.username);
    fileimage.append('choix',"stagiaire");
    return this.http.post(URL+"inscription.php",fileimage,{headers:h});
  }

  public authentification(login:string,pwd:string){
    let payLoad=new HttpParams();
    payLoad=payLoad.append('username',login);
    payLoad=payLoad.append("pwd",pwd);
    return this.http.post(URL+"authentification.php",payLoad);
  }

  getStagiaireById(id: number) {
    let payload=new HttpParams();
    payload=payload.append("id",id)
    return this.http.post(URL+"getStagiaireById.php",payload);
  } 

  putStagiaire(data:Stagiaire)
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
    return this.http.post(URL+'putStagiaire.php',payload);
  }

  getStagiaire(){
    return this.http.get(URL+"getAllStagiaire.php");
  }

  deleteStagiaire(id:number){
    let payLoad=new HttpParams();
    payLoad=payLoad.append("id",id);
    return this.http.post(URL+"deleteStagiaire.php",payLoad);
  }

}
