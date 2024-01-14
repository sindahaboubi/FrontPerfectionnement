import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Admin } from 'src/app/classes/admin';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-navbar-admin',
  templateUrl: './navbar-admin.component.html',
  styleUrls: ['./navbar-admin.component.css']
})
export class NavbarAdminComponent implements OnInit {

  admin:Admin;
  connecte:boolean;
  imgstr:string;
  public currentAdmin:Admin;

  constructor(public router:Router, private adminService:AdminService, private activatedRouter:ActivatedRoute) { }
  id:string=sessionStorage.getItem('idAdmin'); 

  ngOnInit(): void {
    this.adminService.getAdminById((Number)(this.id)).subscribe
    (data => {
      this.currentAdmin=new Admin((Number)(data['data'].id), data['data'].username, data['data'].email,
      data['data'].mdp, data['data'].nom, data['data'].prenom, new Date(data['data'].dateNaiss),
      data['data'].tel, data['data'].cin, data['data'].adresse, data['data'].genre, data['data'].photo)
      this.imgstr="../../../assets/"+data['data'].photo;
      console.log(data['data'])
    });

    if(sessionStorage.hasOwnProperty('idAdmin')) {
      this.adminService.getAdminById(Number(sessionStorage.getItem('idAdmin'))).subscribe(data =>{
        this.admin=new Admin((Number)(data['data'].id), data['data'].username, data['data'].email,
        data['data'].mdp, data['data'].nom, data['data'].prenom, new Date(data['data'].dateNaiss),
        data['data'].tel, data['data'].cin, data['data'].adresse, data['data'].genre, data['data'].image);console.log(data)});
    }  

    this.connecte=sessionStorage.length!=0;
  }
  logout(){
    this.router.navigate(['/accueil']);
    sessionStorage.clear();
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

}
