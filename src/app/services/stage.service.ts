import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Stage } from '../classes/stage';

const URL = environment.baseURL;

@Injectable({
  providedIn: 'root'
})
export class StageService {

  stagesURL=environment.baseURL+"getStages.php";
  stageURL=environment.baseURL+"getStageById.php";
  typesURL=environment.baseURL+"getTypes.php";
  adminsURL=environment.baseURL+"getAllAdmins.php";
  encadrantsURL=environment.baseURL+"getAllEncadrants.php";
  ajoutsURL=environment.baseURL+"getAjouts.php";
  demandesUrl=environment.baseURL+"getDemandes.php";
  stagiairesURL=environment.baseURL+"getAllStagiaire.php";

  constructor(private http:HttpClient) { }

  getStages(){
    return this.http.get(this.stagesURL);
  }

  getAdmins(){
    return this.http.get(this.adminsURL);
  }

  getEncadrants(){
    return this.http.get(this.encadrantsURL);
  }

  getajoutss(){
    return this.http.get(this.ajoutsURL);
  }

  getStageById(id: number){
    let payload=new HttpParams();
    payload=payload.append("id",id);
    return this.http.post(this.stageURL,payload);
  } 

  getTypes(){
    return this.http.get(this.typesURL);
  } 

  getDemandes(){
    return this.http.get(this.demandesUrl);
  }

  getStagiaires(){
    return this.http.get(this.stagiairesURL);
  }

  addStage(s:Stage,fileimage:FormData,h:any){
    fileimage.append("idAdmin",s.idAdmin.toString());
    fileimage.append("montant",s.montant.toString());
    fileimage.append("siPaye",s.siPaye);
    fileimage.append("nbPlaces",s.nbPlaces.toString());
    fileimage.append("sujet",s.sujet);
    fileimage.append("idtype",s.typ.toString());
    fileimage.append("dateDeb",s.dateDeb.toString());
    fileimage.append("dateFin",s.dateFin.toString());
    fileimage.append("departement",s.departement);
    return this.http.post(URL+"addStage.php",fileimage,{headers:h});
  }

  putStage(data:Stage)
  {   
    let payload=new HttpParams();
    payload=payload.append('id',data.id);
    payload=payload.append('sujet',data.sujet);
    payload=payload.append('dateDeb',data.dateDeb.toString());
    payload=payload.append('dateFin',data.dateFin.toString());
    payload=payload.append('siPaye',data.siPaye);
    payload=payload.append('montant',data.montant);
    payload=payload.append('nbPlaces',data.nbPlaces);
    payload=payload.append('departement',data.departement);
    return this.http.post(URL+'putStage.php',payload);
  }

  deleteStage(id:number){
    let payLoad=new HttpParams();
    payLoad=payLoad.append("id",id);
    return this.http.post(URL+"deleteStage.php",payLoad);
  }

}
