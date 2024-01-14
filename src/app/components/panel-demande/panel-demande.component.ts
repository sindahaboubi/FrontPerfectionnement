import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Encadrant } from 'src/app/classes/encadrant';
import { Stage } from 'src/app/classes/stage';
import { Type } from 'src/app/classes/type';
import { DemandeService } from 'src/app/services/demande.service';
import { DemandesSComponent, DialogData } from '../demandes-s/demandes-s.component';

@Component({
  selector: 'app-panel-demande',
  templateUrl: './panel-demande.component.html',
  styleUrls: ['./panel-demande.component.css']
})
export class PanelDemandeComponent implements OnInit {
  
  constructor(public dialogRef: MatDialogRef<DemandesSComponent>, private demandeService:DemandeService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }
  
  verifS:boolean = false;
  id_encadrant:number;
  id_stage:number;
  encadrants:Encadrant[]=[];
  stages:Stage[]=[]; 
  types:Type[]=[];
  id_type:number;

  ngOnInit(): void {
    this.demandeService.getTypes().subscribe(type =>{
      for(let i=0;i<type['data'].length;i++){ 
        this.types.push(new Type((Number)(type['data'][i].id),type['data'][i].nom));
      }
    });

    this.demandeService.getDemandesAcceptes().subscribe(data=>{
      for(let i=0;i<data["data"].length;i++) {
        if(data["data"][i].idDemande==this.data["demande"].id){
          this.verifS=true;
          this.id_encadrant=data["data"][i].idEncadrant;
          this.id_stage=data["data"][i].idStage;
        } 
      }
      this.id_type=this.data["demande"].typ;
    }); 

    this.demandeService.getEncadrants().subscribe(encadrant =>{
      for(let i=0;i<encadrant['data'].length;i++){ 
        this.encadrants.push(new Encadrant((Number)(encadrant['data'][i].id), encadrant['data'][i].username,
        encadrant['data'][i].email, encadrant['data'][i].mdp, encadrant['data'][i].nom, encadrant['data'][i].prenom,
        encadrant['data'][i].dateNaiss, encadrant['data'][i].tel, encadrant['data'][i].cin, encadrant['data'][i].adresse,
        encadrant['data'][i].genre, encadrant['data'][i].specialite,(Number)(encadrant['data'][i].dir)));
      }
    });

    this.demandeService.getStages().subscribe(stage =>{
      for(let i=0;i<stage['data'].length;i++){ 
        this.stages.push(new Stage((Number)(stage['data'][i].id), stage['data'][i].sujet,
        stage['data'][i].dateDeb, stage['data'][i].dateFin, stage['data'][i].siPaye, stage['data'][i].montant,
        stage['data'][i].nbPlaces, stage['data'][i].departement, stage['data'][i].typ, stage['data'][i].idAdmin));
      }
    });
  }

}
