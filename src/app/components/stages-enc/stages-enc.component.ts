import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Ajouts } from 'src/app/classes/ajouts';
import { Demande } from 'src/app/classes/demande';
import { Encadrant } from 'src/app/classes/encadrant';
import { Stage } from 'src/app/classes/stage';
import { Stagiaire } from 'src/app/classes/stagiaire';
import { Type } from 'src/app/classes/type';
import { StageService } from 'src/app/services/stage.service';

@Component({
  selector: 'app-stages-enc',
  templateUrl: './stages-enc.component.html',
  styleUrls: ['./stages-enc.component.css']
})
export class StagesEncComponent implements OnInit {

  tabAjouts:Ajouts[]=[];
  tabAjoutsFiltre:Ajouts[]=[];
  tab:Ajouts[]; 
  encadrants:Encadrant[]=[];
  id_encadrant :String;
  demandes:Demande[]=[];
  stages:Stage[]=[];
  stagiaires:Stagiaire[]=[];
  types:Type[]=[]; 


  constructor(private router:ActivatedRoute, private stageSer:StageService,private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.id_encadrant = sessionStorage.getItem('idEncadrant');
    if(sessionStorage.getItem('idEncadrant')!=null){
      this.afficherAjouts(Number(sessionStorage.getItem('idEncadrant')));
    }
    else 
    this.afficherAjouts();

    this.stageSer.getTypes().subscribe(type =>{
      for(let i=0;i<type['data'].length;i++){ 
        this.types.push(new Type((Number)(type['data'][i].id),type['data'][i].nom));
      }
    })

    this.stageSer.getDemandes().subscribe(demande =>{
      for(let i=0;i<demande['data'].length;i++){ 
        this.demandes.push(new Demande(
          demande['data'][i].demandefac,
          (Number)(demande['data'][i].id),
          demande['data'][i].idStagiaire,
          demande['data'][i].etablissement,
          demande['data'][i].dateCrea,
          demande['data'][i].typ,
          demande['data'][i].dateDeb,
          demande['data'][i].dateFin,
          demande['data'][i].niveauEtude,
          demande['data'][i].cv
          ));
      }
    })

    this.stageSer.getStages().subscribe(stage =>{
      for(let i=0;i<stage['data'].length;i++){ 
        this.stages.push(new Stage(
          (Number)(stage['data'][i].id),
          stage['data'][i].sujet,
          stage['data'][i].dateDeb,
          stage['data'][i].dateFin,
          stage['data'][i].siPaye,
          (Number)(stage['data'][i].montant),
          (Number)(stage['data'][i].nbPlaces),
          stage['data'][i].departement,
          (Number)(stage['data'][i].idAdmin)
          ));
      }
    })

    this.stageSer.getStagiaires().subscribe(stagiaire =>{
      for(let i=0;i<stagiaire['data'].length;i++){ 
        this.stagiaires.push(new Stagiaire(
          (Number)(stagiaire['data'][i].id),
          stagiaire['data'][i].username,
          stagiaire['data'][i].email,
          stagiaire['data'][i].mdp,
          stagiaire['data'][i].nom,
          stagiaire['data'][i].prenom,
          stagiaire['data'][i].dateNaiss,
          stagiaire['data'][i].tel,
          stagiaire['data'][i].cin,
          stagiaire['data'][i].adresse,
          stagiaire['data'][i].genre,
          "../../../assets/"+stagiaire['data'][i].photo
          ));
      }
    })

    this.stageSer.getEncadrants().subscribe(encadrant =>{
      for(let i=0;i<encadrant['data'].length;i++){
        this.encadrants.push(new Encadrant((Number)(encadrant['data'][i].id),
        encadrant['data'][i].username,
        encadrant['data'][i].email,
        encadrant['data'][i].mdp,
        encadrant['data'][i].nom,
        encadrant['data'][i].prenom,
        encadrant['data'][i].dateNaiss,
        encadrant['data'][i].tel,
        encadrant['data'][i].cin,
        encadrant['data'][i].adresse,
        encadrant['data'][i].genre,
        encadrant['data'][i].specialite,
        encadrant['data'][i].iddirection));
      }
    })
  }

  afficherAjouts(id:number=null){
    if(id!=null){ 
     this.stageSer.getajoutss().subscribe( ajoutss => {
       for(let i=0;i<ajoutss['data'].length;i++){
         this.tabAjouts.push(new Ajouts((Number)(ajoutss['data'][i].idAdmin),(Number)(ajoutss['data'][i].idDemande),
         (Number)(ajoutss['data'][i].idStage), (Number)(ajoutss['data'][i].idEncadrant) )); 
       }
       this.tabAjouts=this.tabAjouts.filter(ajoutss => ajoutss.idEncadrant==id);
       this.tabAjoutsFiltre=this.tabAjouts;
       
       })
    }else
    this.stageSer.getajoutss().subscribe( ajoutss => {
     for(let i=0;i<ajoutss['data'].length;i++){
       let s=new Ajouts((Number)(ajoutss['data'][i].idAdmin), (Number)(ajoutss['data'][i].idDemande),
       (Number)(ajoutss['data'][i].idStage), (Number)(ajoutss['data'][i].idEncadrant))
       this.tabAjouts.push(s);
       this.tabAjoutsFiltre.push(s);
     };
 console.log(this.tabAjoutsFiltre);
    }) 
     }

}
