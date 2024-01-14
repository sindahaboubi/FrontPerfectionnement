import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Stage } from 'src/app/classes/stage';
import { Type } from 'src/app/classes/type';
import { StageService } from 'src/app/services/stage.service';

@Component({
  selector: 'app-ajout-stage',
  templateUrl: './ajout-stage.component.html',
  styleUrls: ['./ajout-stage.component.css']
})
export class AjoutStageComponent implements OnInit {

  constructor(private fb: FormBuilder,private stageService:StageService, private router:Router) { }

  ajouterStage :FormGroup;
  types:Type[]=[]; 
  stages:Stage[]=[];

  isVisible: any;
  isSelected: boolean = true;

  ngOnInit(): void {
    this.stageService.getTypes().subscribe(type =>{
      for(let i=0;i<type['data'].length;i++){
        this.types.push(new Type((Number)(type['data'][i].id),type['data'][i].nom));
      }
    });

    this.stageService.getStages().subscribe(data => {
      for(let i=0;i<data["data"].length;i++){
        let s:Stage=new Stage(data["data"].id, data["data"].sujet, data["data"].dateDeb,
        data["data"].dateFin, data["data"].siPaye, data["data"].montant,  data["data"].nbPlaces,
        data["data"].departement, data["data"].typ, data["data"].idAdmin);
        this.stages.push(s);
      }
    }); 
    this.ajouterStage = this.fb.group({
      departement:[""],
      sujet :[""],
      typ:[],
      idAdmin:[sessionStorage.getItem('idAdmin')],
      dateDeb:[],
      dateFin:[],
      montant:["0"],
      nbPlaces:[],
      siPaye:[]
    })
  }

  onSubmit(){

    let myFormData = new FormData();
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    this.stageService.addStage(this.ajouterStage.value,myFormData,headers).subscribe(data=>{
      if(data["data"]!="Fail"){
        this.ajouterStage.reset();
        window.location.reload();
      }else{
        document.getElementById("result").innerHTML="Stage non ajouté.";
        document.getElementById("result").classList.add("alert-danger");
      }
    })
}

}
