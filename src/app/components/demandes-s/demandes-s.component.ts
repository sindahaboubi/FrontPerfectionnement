import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Ajouts } from 'src/app/classes/ajouts';
import { Demande } from 'src/app/classes/demande';
import { Encadrant } from 'src/app/classes/encadrant';
import { Stagiaire } from 'src/app/classes/stagiaire';
import { Type } from 'src/app/classes/type';
import { DemandeService } from 'src/app/services/demande.service';
import { PanelDemandeComponent } from '../panel-demande/panel-demande.component';

export interface DialogData {
  stagiaire:Stagiaire
  encadrant:Encadrant
}

@Component({
  selector: 'app-demandes-s',
  templateUrl: './demandes-s.component.html',
  styleUrls: ['./demandes-s.component.css']
})
export class DemandesSComponent implements OnInit {

  tabDemande:Demande[]=[];
  tabDemandeFiltre:Demande[]=[];
  tab:Demande[]; 
  FormTri:FormGroup;
  types:Type[]=[];
  ajoutss:Ajouts[]=[];
  stagiaires:Stagiaire[]=[];
  id_stagiaire :String;
  val:any;

  constructor(private router:ActivatedRoute, private demandeSer:DemandeService,
    private formBuilder:FormBuilder, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.id_stagiaire = sessionStorage.getItem('idStagiaire');
    if(sessionStorage.getItem('idStagiaire')!=null){
      this.afficherDemandes(Number(sessionStorage.getItem('idStagiaire')));
    }
    else
    this.afficherDemandes();

    this.demandeSer.getTypes().subscribe(type =>{
      for(let i=0;i<type['data'].length;i++){ 
        this.types.push(new Type((Number)(type['data'][i].id),type['data'][i].nom));
      }
    })

    this.demandeSer.getDemandesAcceptes().subscribe(ajouts =>{
      for(let i=0;i<ajouts['data'].length;i++){ 
        this.ajoutss.push(new Ajouts(
          (Number)(ajouts['data'][i].idAdmin),
          (Number)(ajouts['data'][i].idDemande),
          (Number)(ajouts['data'][i].idStage),
          (Number)(ajouts['data'][i].idEncadrant)
          ));
      }
    })

    this.demandeSer.getStagiaires().subscribe(stagiaire =>{
      for(let i=0;i<stagiaire['data'].length;i++){
        this.stagiaires.push(new Stagiaire((Number)(stagiaire['data'][i].id),
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
        "../../../assets/"+stagiaire['data'][i].photo));
      }
    })
  }

  afficherDemandes(id:number=null){
    if(id!=null){
     this.demandeSer.getDemandes().subscribe( demandes => {
       for(let i=0;i<demandes['data'].length;i++){
         this.tabDemande.push(new Demande(demandes['data'][i].demandefac, (Number)(demandes['data'][i].id),
         (Number)(demandes['data'][i].idStagiaire), demandes['data'][i].etablissement, 
         demandes['data'][i].dateCreation, (Number)(demandes['data'][i].idtype), demandes['data'][i].dateDeb, 
         demandes['data'][i].dateFin, demandes['data'][i].niveauEtude, demandes['data'][i].cv )); 
       }
       this.tabDemande=this.tabDemande.filter(demandes => demandes.idStagiaire==id);
       this.tabDemandeFiltre=this.tabDemande;
       
       })
    }else
    this.demandeSer.getDemandes().subscribe( demandes => {
     for(let i=0;i<demandes['data'].length;i++){ 
       let d=new Demande(demandes['data'][i].demandefac, (Number)(demandes['data'][i].id),
       (Number)(demandes['data'][i].idStagiaire), demandes['data'][i].etablissement, 
       demandes['data'][i].dateCreation, (Number)(demandes['data'][i].idtype), demandes['data'][i].dateDeb, 
       demandes['data'][i].dateFin, demandes['data'][i].niveauEtude, demandes['data'][i].cv )
       this.tabDemande.push(d);
       this.tabDemandeFiltre.push(d);
     }
     this.router.queryParams.subscribe((params) => {
       if(params["type"]!=undefined)
       {
         this.tabDemandeFiltre=this.tabDemandeFiltre.filter(d =>d.typ==Number(params["type"]));  
       }  
 }
 );
 console.log(this.tabDemandeFiltre);
    })
  }
  
  openDialog(i:number) {
    const dialogRef = this.dialog.open(PanelDemandeComponent,{
      width: '740px',
      height:'400px',
      data: {
             demande:this?.tabDemandeFiltre[i] 
            }});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
 
}
