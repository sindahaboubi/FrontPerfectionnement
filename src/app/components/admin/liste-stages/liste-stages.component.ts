import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Admin } from 'src/app/classes/admin';
import { Stage } from 'src/app/classes/stage';
import { Type } from 'src/app/classes/type';
import { StageService } from 'src/app/services/stage.service';

@Component({
  selector: 'app-liste-stages',
  templateUrl: './liste-stages.component.html',
  styleUrls: ['./liste-stages.component.css']
})
export class ListeStagesComponent implements OnInit {

  tabStage:Stage[]=[];
  tabStageFiltre:Stage[]=[];
  tab:Stage[]; 
  FormTri:FormGroup;
  types:Type[]=[];
  admins:Admin[]=[];
  id_admin :String;
  val:any;

  constructor(private router:ActivatedRoute, private stageSer:StageService,private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.id_admin = sessionStorage.getItem('idAdmin');
    if(sessionStorage.getItem('idAdmin')!=null){
      this.afficherStages(Number(sessionStorage.getItem('idAdmin')));
    }
    else
    this.afficherStages();

    this.stageSer.getTypes().subscribe(type =>{
      for(let i=0;i<type['data'].length;i++){ 
        this.types.push(new Type((Number)(type['data'][i].id),type['data'][i].nom));
      }
    })
 
    this.stageSer.getAdmins().subscribe(admin =>{
      for(let i=0;i<admin['data'].length;i++){
        this.admins.push(new Admin((Number)(admin['data'][i].id),
        admin['data'][i].username,
        admin['data'][i].email,
        admin['data'][i].mdp,
        admin['data'][i].nom,
        admin['data'][i].prenom,
        admin['data'][i].dateNaiss,
        admin['data'][i].tel,
        admin['data'][i].cin,
        admin['data'][i].adresse,
        admin['data'][i].genre,
        "../../../assets/"+admin['data'][i].photo));
      }
    })
    this.FormTri=this.formBuilder.group({
      type:[],
      dateDeb:[],
      dateFin:[],
      choix:[]
    });
    this.FormTri.reset();  
  }

  afficherStages(id:number=null){
    if(id!=null){
     this.stageSer.getStages().subscribe( stages => {
       for(let i=0;i<stages['data'].length;i++){
         this.tabStage.push(new Stage((Number)(stages['data'][i].id), stages['data'][i].sujet, 
         stages['data'][i].dateDeb, stages['data'][i].dateFin, stages['data'][i].siPaye, 
         (Number)(stages['data'][i].montant), (Number)(stages['data'][i].nbPlaces), 
         stages['data'][i].departement, (Number)(stages['data'][i].idtype), (Number)(stages['data'][i].idAdmin))); 
       }
       this.tabStage=this.tabStage.filter(stages => stages.idAdmin==id);
       this.tabStageFiltre=this.tabStage;
       
       })
    }else
    this.stageSer.getStages().subscribe( stages => {
     for(let i=0;i<stages['data'].length;i++){
       let s=new Stage((Number)(stages['data'][i].id), stages['data'][i].sujet, stages['data'][i].dateDeb, 
       stages['data'][i].dateFin, stages['data'][i].siPaye, (Number)(stages['data'][i].montant), 
       (Number)(stages['data'][i].nbPlaces), stages['data'][i].departement, 
       (Number)(stages['data'][i].idtype), (Number)(stages['data'][i].idAdmin))
       this.tabStage.push(s);
       this.tabStageFiltre.push(s);
     }
     this.router.queryParams.subscribe((params) => {
       if(params["type"]!=undefined)
       {
         this.tabStageFiltre=this.tabStageFiltre.filter(s =>s.typ==Number(params["type"]));  
       }  
 }
 );
 console.log(this.tabStageFiltre);
    })
     }

     onSubmit()
     {
       if(this.FormTri.value['admin']!=null){
         var idAdmin=this.FormTri.value['admin'];
         this.tabStageFiltre=this.tabStage.filter(stage =>stage.idAdmin==this.FormTri.value['admin']);
       }
       
       if(this.FormTri.value['type']!=null){
         var typ=this.FormTri.value['type'];
         this.tabStageFiltre=this.tabStage.filter(stage =>stage.typ==this.FormTri.value['type']);
       }

       if(this.FormTri.value['dateDeb']!=null && this.FormTri.value['dateFin']!=null){
         this.tabStageFiltre=this.tabStage.filter(stage => stage.dateDeb >= this.FormTri.value['dateDeb'] 
         && stage.dateFin <= this.FormTri.value['dateFin']);
       }
       
       if(this.FormTri.value['choix']==1){
         this.tabStageFiltre=this.tabStage;
       }
   
       this.FormTri.reset();
       this.FormTri.value['type']=typ;
       this.FormTri.value['admin']=idAdmin;
     }

     onOpenModal(mode:string):void{
      const container=document.getElementById('main-container');
      const button=document.createElement('button');
      button.type='button';
      button.style.display='none';
      button.setAttribute('data-toggle','modal');
      if(mode=='connecte'){
        button.setAttribute('data-target','#connecteModal'); 
      }
      container?.appendChild(button);
      button.click();
    }

}
