import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Ajouts } from '../classes/ajouts';
import { Demande } from '../classes/demande';

const URL = environment.baseURL;

@Injectable({
  providedIn: 'root'
})
export class DemandeService {

  demandesURL=environment.baseURL+"getDemandes.php";
  demandeURL=environment.baseURL+"getDemandeById.php";
  typesURL=environment.baseURL+"getTypes.php";
  stagesURL=environment.baseURL+"getStages.php";
  encadrantsURL=environment.baseURL+"getAllEncadrants.php";
  stagiairesURL=environment.baseURL+"getAllStagiaire.php";

  constructor(private http:HttpClient) { }

  getDemandes(){
    return this.http.get(this.demandesURL);
  }

  getDemandeById(id: number){
    let payload=new HttpParams();
    payload=payload.append("id",id);
    return this.http.post(this.demandeURL,payload);
  } 

  getTypes(){
    return this.http.get(this.typesURL);
  }

  addDemande(d:Demande,fileimage:FormData,h:any){
    fileimage.append("idStagiaire",d.idStagiaire.toString());
    fileimage.append("etablissement",d.etablissement);
    fileimage.append("dateCreation",d.dateCrea.toString());
    fileimage.append("idtype",d.typ.toString());
    fileimage.append("dateDeb",d.dateDeb.toString());
    fileimage.append("dateFin",d.dateFin.toString());
    fileimage.append("niveauEtude",d.niveauEtude);
    return this.http.post(URL+"addDemande.php",fileimage,{headers:h});
  }  

  getStages(){
    return this.http.get(this.stagesURL);
  }

  getEncadrants(){
    return this.http.get(this.encadrantsURL);
  }

  addStageDemande(a:Ajouts,fileimage:FormData,h:any){
    fileimage.append("idAdmin",a.idAdmin.toString());
    fileimage.append("idDemande",a.idDemande.toString());
    fileimage.append("idStage",a.idStage.toString()); 
    fileimage.append("idEncadrant",a.idEncadrant.toString()); 
    return this.http.post(URL+"ajouterStageDemande.php",fileimage,{headers:h});
  }

  getStagiaires(){
    return this.http.get(this.stagiairesURL);
  }

  getDemandesAcceptes(){
    return this.http.get(environment.baseURL+"getDemandesAcceptees.php");
  }
}
