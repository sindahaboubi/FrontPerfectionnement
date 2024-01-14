import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { EncadrantService } from 'src/app/services/encadrant.service';
import { StagiaireService } from 'src/app/services/stagiaire.service';

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.css']
})
export class AuthentificationComponent implements OnInit {

  formAuthentication:FormGroup;

  constructor(private router:Router,private adminService:AdminService,private encadrantService:EncadrantService,private stagiaireService:StagiaireService
    ,private formBuilder:FormBuilder) { }


  ngOnInit(): void {
    this.formAuthentication=this.formBuilder.group({
      login:['', [Validators.required]],
      pwd:['', [Validators.required]]
    })
  }

  msg='';

  onSubmit(){
    this.stagiaireService.authentification(this.formAuthentication.get('login').value,this.formAuthentication.get('pwd').value).subscribe(data=>{
      if(data["data"]!=null){
        if (!(sessionStorage.hasOwnProperty("idStagiaire")))
        {sessionStorage.setItem('idStagiaire',data["data"].id);window.location.reload()}
      }else
      this.msg="ce compte n'existe pas !";
    });

    this.encadrantService.authentification(this.formAuthentication.get('login').value,this.formAuthentication.get('pwd').value).subscribe(data=>{
      if(data["data"]!=null){
        if (!(sessionStorage.hasOwnProperty('idEncadrant')))
        {sessionStorage.setItem('idEncadrant',data["data"].id);window.location.reload()}
      }else
      this.msg="ce compte n'existe pas !";
    });
    this.adminService.authentification(this.formAuthentication.get('login').value,this.formAuthentication.get('pwd').value).subscribe(data=>{
      if(data["data"]!=null){
        if (!(sessionStorage.hasOwnProperty('idAdmin')))
        {sessionStorage.setItem('idAdmin',data["data"].id);
        window.location.assign("dash");
      }
      }else
      this.msg="ce compte n'existe pas !";
    });
  }

  get login(){
    return this.formAuthentication.get('login');
  }
  get pwd(){
    return this.formAuthentication.get('pwd');
  }

}
