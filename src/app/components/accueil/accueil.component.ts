import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Encadrant } from 'src/app/classes/encadrant';
import { Stagiaire } from 'src/app/classes/stagiaire';
import { EncadrantService } from 'src/app/services/encadrant.service';
import { StagiaireService } from 'src/app/services/stagiaire.service';
import { AuthentificationComponent } from '../authentification/authentification.component';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {

  idAdmin=Number(sessionStorage.getItem("idAdmin"));
  idEncadrant = Number(sessionStorage.getItem("idEncadrant"));

  connecte:boolean;
  stagiaire:Stagiaire;
  encadrant:Encadrant;
  id_encadrant :String;

  constructor(private router:Router , private stagiaireService:StagiaireService,
    private encadrantService:EncadrantService, private dialog:MatDialog) { }
 
    onOpenModal(mode:string):void{
    const container=document.getElementById('main-container');
    const button=document.createElement('button');
    button.type='button';
    button.style.display='none';
    button.setAttribute('data-toggle','modal');
    if(mode=='inscrire'){
      button.setAttribute('data-target','#inscrireModal'); 
    }
    if(mode=='connecte'){
      button.setAttribute('data-target','#connecteModal'); 
    }
    container?.appendChild(button);
    button.click();
  }

  ngOnInit(): void {
    
    if(sessionStorage.hasOwnProperty('idStagiaire')) {
      this.stagiaireService.getStagiaireById(Number(sessionStorage.getItem('idStagiaire'))).subscribe(data =>{
        this.stagiaire=new Stagiaire((Number)(data['data'].id), data['data'].username, data['data'].email,
        data['data'].mdp, data['data'].nom, data['data'].prenom, new Date(data['data'].dateNaiss),
        data['data'].tel, data['data'].cin, data['data'].adresse, data['data'].genre, data['data'].image);console.log(data)});
    } 
    if(sessionStorage.hasOwnProperty('idEncadrant')) {
      this.encadrantService.getEncadrantById(Number(sessionStorage.getItem('idEncadrant'))).subscribe(data => 
        this.encadrant=new Encadrant((Number)(data['data'].id), data['data'].username, data['data'].email,
        data['data'].mdp, data['data'].nom, data['data'].prenom, new Date(data['data'].dateNaiss),
        data['data'].tel, data['data'].cin, data['data'].adresse, data['data'].genre, data['data'].specialite,
        (Number)(data['data'].dir)));
    }
    this.connecte=sessionStorage.length!=0;


    this.id_encadrant = sessionStorage.getItem('idEncadrant');
  }

  openDialog() {
    const dialogRef = this.dialog.open(AuthentificationComponent,{
      width: '700px',
      height:'430px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
