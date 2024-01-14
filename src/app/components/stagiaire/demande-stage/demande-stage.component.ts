import { formatDate } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Demande } from 'src/app/classes/demande';
import { Type } from 'src/app/classes/type';
import { DemandeService } from 'src/app/services/demande.service';

@Component({
  selector: 'app-demande-stage',
  templateUrl: './demande-stage.component.html',
  styleUrls: ['./demande-stage.component.css']
})
export class DemandeStageComponent implements OnInit {

  constructor(private fb: FormBuilder,private demandeService:DemandeService) { }

  date_jour:Date=new Date();
  ajouterDemande :FormGroup;
  types:Type[]=[]; 

      /* file upload */
     /* Variabe to store file data */
     filedata:any;
     filedata1:any;
    /* File onchange event */
    fileEvent(e:any){
        this.filedata =<File>e.target.files[0];
    }
    
    fileEvent1(e:any){
      this.filedata1 =<File>e.target.files[0];
    }

demandes:Demande[]=[];

  ngOnInit(): void {
    this.demandeService.getDemandes().subscribe(data => {
      for(let i=0;i<data["data"].length;i++){
        let d:Demande=new Demande(data["data"].demandefac, data["data"].id, data["data"].idStagiaire,
        data["data"].etablissement, data["data"].dateCrea, data["data"].typ,  data["data"].dateDeb,
        data["data"].dateFin, data["data"].niveauEtude, data["data"].cv);
        this.demandes.push(d);
      }
    }); 
    this.demandeService.getTypes().subscribe(type =>{
      for(let i=0;i<type['data'].length;i++){
        this.types.push(new Type((Number)(type['data'][i].id),type['data'][i].nom));
      }
    })
    this.ajouterDemande = this.fb.group({
      etablissement:["",Validators.required],
      demandefac :["",Validators.required],
      typ:["",Validators.required],
      idStagiaire:[sessionStorage.getItem('idStagiaire')],
      dateCrea:[this.date_jour],
      dateDeb:['',Validators.required],
      dateFin:['',Validators.required],
      niveauEtude:["",Validators.required],
      cv:["",Validators.required],
    })
  }

  get typ() {
    return this.ajouterDemande.get('typ');
  }
  get etablissement() {
    return this.ajouterDemande.get('etablissement');
  }
  get demandefac() {
    return this.ajouterDemande.get('demandefac');
  }
  get dateCrea() {
    return this.ajouterDemande.get('dateCrea');
  } 
  get idStagiaire() {
    return this.ajouterDemande.get('idStagiaire');
  }
  get dateDeb() {
    return this.ajouterDemande.get('dateDeb');
  }
  get dateFin(){
    return this.ajouterDemande.get('dateFin');
  }
  get niveauEtude() {
    return this.ajouterDemande.get('niveauEtude');
  }
  get cv() {
    return this.ajouterDemande.get('cv');
  }


  onSubmit(){
    let myFormData = new FormData();
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    myFormData.append('demandefac', this.filedata);
    myFormData.append('cv', this.filedata1);

    this.demandeService.addDemande(this.ajouterDemande.value,myFormData,headers).subscribe(data=>{
      if(data["data"]!="Fail"){
        document.getElementById("result1").innerHTML="Demande effectuée avec succès.";
        document.getElementById("result1").classList.add("alert-success");
        this.ajouterDemande.reset();
      }else if(data["data"]=="Fail"){
        document.getElementById("result").innerHTML="Vous ne pouvez pas demander plus d'un stage dans la même période !";
        document.getElementById("result").classList.add("alert-danger");
      }
    })
}

} 
