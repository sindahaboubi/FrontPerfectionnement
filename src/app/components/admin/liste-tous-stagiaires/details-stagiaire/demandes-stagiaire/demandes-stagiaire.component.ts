import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Ajouts } from 'src/app/classes/ajouts';
import { Demande } from 'src/app/classes/demande';
import { Direction } from 'src/app/classes/direction';
import { Encadrant } from 'src/app/classes/encadrant';
import { Stage } from 'src/app/classes/stage';
import { Type } from 'src/app/classes/type';
import { DemandeService } from 'src/app/services/demande.service';
import { EncadrantService } from 'src/app/services/encadrant.service';

@Component({
  selector: 'app-demandes-stagiaire',
  templateUrl: './demandes-stagiaire.component.html',
  styleUrls: ['./demandes-stagiaire.component.css']
})
export class DemandesStagiaireComponent implements OnInit {

  constructor(private activatedRouter:ActivatedRoute, private DemandeService:DemandeService,
    private fb:FormBuilder,private encadrantService:EncadrantService ,private router:Router,private formBuilder:FormBuilder ) { }

  id:number=this.activatedRouter.snapshot.params['id'];
  demandes:Demande[]=[];
  types:Type[]=[];
  imgDem:string;
  imgCv:string;
  stages:Stage[]=[];
  encadrants:Encadrant[]=[];
  affecterStage :FormGroup;
  public currentDemande!: Demande;
  idDemandeF:number;
  ajoutss:Ajouts[]=[];

  tabAjouts:Ajouts[]=[]; 
  tabAjoutsFiltre:Ajouts[]=[];
  tab:Ajouts[]; 
  directions:Direction[]=[];
  id_direction:number;
  

  ngOnInit(): void { 

    this.DemandeService.getDemandes().subscribe(data=>{
      for(let i=0;i<data['data'].length;i++)
      {
        this.demandes.push(new Demande(
        "../../../assets/"+data['data'][i].demandefac, 
        (Number)(data['data'][i].id),
        (Number)(data['data'][i].idStagiaire), 
        data['data'][i].etablissement, 
        new Date(data['data'][i].dateCreation),
        (Number)(data['data'][i].idtype), 
        new Date(data['data'][i].dateDeb), 
        new Date(data['data'][i].dateFin), 
        data['data'][i].niveauEtude, 
        "../../../assets/"+data['data'][i].cv 
        ))
      }
    this.demandes=this.demandes.filter(demande=>(Number)(demande.idStagiaire)==this.id);
    }) 

    this.DemandeService.getTypes().subscribe(type =>{
      for(let i=0;i<type['data'].length;i++){ 
        this.types.push(new Type((Number)(type['data'][i].id),type['data'][i].nom));
      }
    })

    this.encadrantService.getDirections().subscribe(direction =>{
      for(let i=0;i<direction['data'].length;i++){ 
        this.directions.push(new Direction((Number)(direction['data'][i].id),direction['data'][i].libelle));
      }
    });

    this.affecterStage = this.fb.group({
      idAdmin:[sessionStorage.getItem('idAdmin')],
      idDemande:[],
      idStage:[],  
      idEncadrant:[],
    })

    this.DemandeService.getStages().subscribe(stage =>{
      for(let i=0;i<stage['data'].length;i++){
        this.stages.push(new Stage(
          (Number)(stage['data'][i].id), 
          stage['data'][i].sujet,
          new Date(stage['data'][i].dateDeb), 
          new Date(stage['data'][i].dateFin), 
          stage['data'][i].siPaye, 
          (Number)(stage['data'][i].montant),
          (Number)(stage['data'][i].nbPlaces), 
          stage['data'][i].departement, 
          (Number)(stage['data'][i].idtype), 
          (Number)(stage['data'][i].idAdmin)));
      } 
    })

    this.DemandeService.getEncadrants().subscribe(encadrant =>{
      for(let i=0;i<encadrant['data'].length;i++){
        this.encadrants.push(new Encadrant(
          (Number)(encadrant['data'][i].id), 
          encadrant['data'][i].username,
          encadrant['data'][i].email, 
          encadrant['data'][i].mdp, 
          encadrant['data'][i].nom, 
          encadrant['data'][i].prenom,
          new Date(encadrant['data'][i].dateNaiss), 
          encadrant['data'][i].tel, 
          encadrant['data'][i].cin,
          encadrant['data'][i].adresse, 
          encadrant['data'][i].genre, 
          encadrant['data'][i].specialite,
          (Number)(encadrant['data'][i].iddirection)));
      }
    })

    this.DemandeService.getDemandesAcceptes().subscribe(ajouts =>{
      for(let i=0;i<ajouts['data'].length;i++){ 
        this.ajoutss.push(new Ajouts(
          (Number)(ajouts['data'][i].idAdmin),
          (Number)(ajouts['data'][i].idDemande),
          (Number)(ajouts['data'][i].idStage),
          (Number)(ajouts['data'][i].idEncadrant)
          ));
      }
    })
  }
  
  onSubmit(){
    let myFormData = new FormData();
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    this.DemandeService.addStageDemande(this.affecterStage.value,myFormData,headers).subscribe(data=>{
      if(data["data"]!="Fail"){
        window.location.reload();
      }else{
        window.location.reload();
      }
    })
}

public onOpenModal(demandee:Demande, mode:string):void{
  const container=document.getElementById('main-container');
  const button=document.createElement('button');
  button.type='button';
  button.style.display='none';
  button.setAttribute('data-toggle','modal');
  if(mode=='add'){ 
    this.currentDemande=demandee;
    this.affecterStage.get('idDemande').setValue(demandee.id); 
    button.setAttribute('data-target','#updateEmployeeModal'); 
  }
  container?.appendChild(button); 
  button.click();
}

get idStage(){
  return this.affecterStage.get('idStage');
  } 

  get idEncadrant(){
    return this.affecterStage.get('idEncadrant');
    } 

}
