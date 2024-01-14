import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Admin } from 'src/app/classes/admin';
import { Encadrant } from 'src/app/classes/encadrant';
import { Stagiaire } from 'src/app/classes/stagiaire';
import { AdminService } from 'src/app/services/admin.service';
import { EncadrantService } from 'src/app/services/encadrant.service';
import { StagiaireService } from 'src/app/services/stagiaire.service';
import { AuthentificationComponent } from '../authentification/authentification.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  stagiaire:Stagiaire;
  encadrant:Encadrant;
  admin:Admin;
  connecte:boolean;
  imgstr:string;
  public currentStagiaire:Stagiaire;
 
  constructor(private stagiaireService:StagiaireService,private encadrantService:EncadrantService,
    private adminService:AdminService, private activatedRouter:ActivatedRoute, private router:Router,
    private dialog:MatDialog) { }

    id:string=sessionStorage.getItem('idStagiaire'); 
  ngOnInit(): void {
    this.stagiaireService.getStagiaireById((Number)(this.id)).subscribe
    (data => {
      this.currentStagiaire=new Stagiaire((Number)(data['data'].id), data['data'].username, data['data'].email,
      data['data'].mdp, data['data'].nom, data['data'].prenom, new Date(data['data'].dateNaiss),
      data['data'].tel, data['data'].cin, data['data'].adresse, data['data'].genre, data['data'].photo)
      this.imgstr="../../../assets/"+data['data'].photo;
      console.log(data['data'])
    });

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

    if(sessionStorage.hasOwnProperty('idAdmin')) {
      this.adminService.getAdminById(Number(sessionStorage.getItem('idAdmin'))).subscribe(data =>{
        this.admin=new Admin((Number)(data['data'].id), data['data'].username, data['data'].email,
        data['data'].mdp, data['data'].nom, data['data'].prenom, new Date(data['data'].dateNaiss),
        data['data'].tel, data['data'].cin, data['data'].adresse, data['data'].genre, data['data'].image);console.log(data)});
    } 

    this.connecte=sessionStorage.length!=0;
  }

  logout(){
    sessionStorage.clear();
    this.stagiaire=null;
    this.encadrant=null;
    this.admin=null;
    window.location.reload();
  }

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
