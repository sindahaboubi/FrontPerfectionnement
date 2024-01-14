import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Admin } from 'src/app/classes/admin';
import { Ajouts } from 'src/app/classes/ajouts';
import { Stage } from 'src/app/classes/stage';
import { Type } from 'src/app/classes/type';
import { AdminService } from 'src/app/services/admin.service';
import { StageService } from 'src/app/services/stage.service';

@Component({
  selector: 'app-stage',
  templateUrl: './stage.component.html',
  styleUrls: ['./stage.component.css']
})
export class StageComponent implements OnInit {

  types:Type[]=[];
  stage:Stage;
  admin:Admin;
  btnUpdateShow:boolean = false;
  btnSaveShow:boolean = true;
  connecte:boolean;
  idAdm:number=Number(sessionStorage.getItem('idAdmin')); //id de l'admin connecté 
  id:number=this.activatedRouter.snapshot.params['id'];
  currentStage:Stage;
  adm:Admin;
  formValue : FormGroup; 

  ajoutss:Ajouts[]=[];

  tabAjouts:Ajouts[]=[];
  tabAjoutsFiltre:Ajouts[]=[];
  tab:Ajouts[]; 

  constructor(public router: Router, private stageSer:StageService, private activatedRouter:ActivatedRoute,
    private fs:FormBuilder, private adminservice:AdminService, private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.stageSer.getTypes().subscribe(type =>{
      for(let i=0;i<type['data'].length;i++){ 
        this.types.push(new Type((Number)(type['data'][i].id),type['data'][i].nom));
      }
    });
    this.stageSer.getStageById(this.id).subscribe
    (stages => 
      {
      this.currentStage=new Stage((Number)(stages['data'].id), stages['data'].sujet, stages['data'].dateDeb, 
      stages['data'].dateFin, stages['data'].siPaye, (Number)(stages['data'].montant), (Number)(stages['data'].nbPlaces), 
      stages['data'].departement,(Number)(stages['data'].idtype), (Number)(stages['data'].idAdmin)) as Stage
      this.adminservice.getAdminById(this.currentStage.idAdmin).subscribe(data => {this.adm=new Admin((Number)(data['data'].id),
      data['data'].username, data['data'].email, data['data'].mdp, data['data'].nom, data['data'].prenom,
      new Date(data['data'].dateNaiss), data['data'].tel, data['data'].cin, data['data'].adresse,
      data['data'].genre, "../../../assets/"+data['data'].photo)})
    }
    );
    this.connecte=sessionStorage.hasOwnProperty('idAdmin');

    this.formValue = this.formBuilder.group({ 
      sujet:['',Validators.required],
      dateDeb:['',Validators.required],
      dateFin:['',Validators.required],
      siPaye:[''],
      montant:[''],
      nbPlaces:[''],
      departement:['',Validators.required],
      typ:[Validators.required],
  });

  if(this.id!=null){
    this.afficherStages(this.id);
  }
  else
  this.afficherStages();
  }

  afficherStages(id:number=null){
    if(id!=null){
     this.stageSer.getajoutss().subscribe( ajoutss => {
       for(let i=0;i<ajoutss['data'].length;i++){
         this.tabAjouts.push(new Ajouts(
          (Number)(ajoutss['data'][i].idAdmin),
          (Number)(ajoutss['data'][i].idDemande),
          (Number)(ajoutss['data'][i].idStage),
          (Number)(ajoutss['data'][i].idEncadrant)
         )); 
       }
       this.tabAjouts=this.tabAjouts.filter(ajoutss => ajoutss.idStage==id);
       this.tabAjoutsFiltre=this.tabAjouts; 
       
       })
    }
     }

  EditStage(data:any){
    this.UpdateShowBtn();
    this.formValue.controls['sujet'].setValue(data.sujet);
    this.formValue.controls['dateDeb'].setValue(data.dateDeb);
    this.formValue.controls['dateFin'].setValue(data.dateFin);
    this.formValue.controls['siPaye'].setValue(data.siPaye);
    this.formValue.controls['montant'].setValue(data.montant);
    this.formValue.controls['nbPlaces'].setValue(data.nbPlaces);
    this.formValue.controls['departement'].setValue(data.departement);
    this.formValue.controls['idtyp'].setValue(data.typ);
  }

  UpdateStage(){
    let s=new Stage((Number)(this.currentStage.id), this.formValue.value['sujet'], this.formValue.value['dateDeb'],
    this.formValue.value['dateFin'], this.formValue.value['siPaye'], (Number)(this.formValue.value['montant']),
    (Number)(this.formValue.value['nbPlaces']), this.formValue.value['departement'], 0,0);
    console.log(s);
    this.stageSer.putStage(s).subscribe(res => {
      alert("Stage modifié avec succés");
      this.SaveShowBtn();
    })
  }

  isVisible: any;
  isSelected: boolean = true;

  SaveShowBtn()
{
  this.btnUpdateShow = false;
  this.btnSaveShow = true;
  window.location.reload()
}

  UpdateShowBtn()
  {
    this.btnUpdateShow = true;
    this.btnSaveShow = false;
  }

  supprimer(){
    this.stageSer.deleteStage(this.id).subscribe(data=>{
      if(data["data"]!="Fail")
      this.router.navigate(['/listeStagesAdmin']);
    });
  }

  onOpenModal(unstage:Stage, mode:string):void{
    const container=document.getElementById('main-container');
    const button=document.createElement('button');
    button.type='button';
    button.style.display='none';
    button.setAttribute('data-toggle','modal');
    if(mode=='delete'){
      this.stage=unstage;
      button.setAttribute('data-target','#deleteStageModal'); 
    }
    container?.appendChild(button);
    button.click();
  }

  get sujet() {
    return this.formValue.controls["sujet"];
  }
  get dateDeb() {
    return this.formValue.controls["dateDeb"];
  }
  get dateFin() {
    return this.formValue.controls["dateFin"];
  }  
  get departement() {
    return this.formValue.controls["departement"];
  }
  get typ() {
    return this.formValue.controls["typ"];
  }

}
