import { Component, OnInit } from '@angular/core';
import { Admin } from 'src/app/classes/admin';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-menu-admin',
  templateUrl: './menu-admin.component.html',
  styleUrls: ['./menu-admin.component.css']
})
export class MenuAdminComponent implements OnInit {
  constructor(private adminService:AdminService) { }

  admin:Admin;
  connecte:boolean;
  imgstr:string;
  public currentAdmin:Admin;
  id:string=sessionStorage.getItem('idAdmin');
   
  ngOnInit(): void {
      this.adminService.getAdminById(
        (Number)(this.id)).subscribe(data => {
        this.currentAdmin=new Admin(
          (Number)(data['data'].id), 
          data['data'].username, 
          data['data'].email,
          data['data'].mdp, 
          data['data'].nom, 
          data['data'].prenom, 
          new Date(data['data'].dateNaiss),
          data['data'].tel, 
          data['data'].cin, 
          data['data'].adresse, 
          data['data'].genre, 
          data['data'].photo)
          this.imgstr="../../../assets/"+data['data'].photo;
          console.log(data['data'])
      })

    if(sessionStorage.hasOwnProperty('idAdmin')) {
      this.adminService.getAdminById(Number(sessionStorage.getItem('idAdmin'))).subscribe(data =>{
        this.admin=new Admin((Number)(data['data'].id), data['data'].username, data['data'].email,
        data['data'].mdp, data['data'].nom, data['data'].prenom, new Date(data['data'].dateNaiss),
        data['data'].tel, data['data'].cin, data['data'].adresse, data['data'].genre, data['data'].image);
        console.log(data)});
    } 
    this.connecte=sessionStorage.length!=0;
  }

}
