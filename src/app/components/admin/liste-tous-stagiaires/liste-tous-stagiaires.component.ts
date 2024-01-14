import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Stagiaire } from 'src/app/classes/stagiaire';
import { StagiaireService } from 'src/app/services/stagiaire.service';

@Component({
  selector: 'app-liste-tous-stagiaires',
  templateUrl: './liste-tous-stagiaires.component.html',
  styleUrls: ['./liste-tous-stagiaires.component.css']
})
export class ListeTousStagiairesComponent implements OnInit {

  stagiaires:Stagiaire[]=[];
  nom:string;
  public deleteStagiaire: Stagiaire;
  val:any;

  constructor(private stagiaireService:StagiaireService, private router:Router) { }

  ngOnInit(): void {
    this.stagiaireService.getStagiaire().subscribe(data=>{
      for(let i=0;i<data['data'].length;i++){
        let s:Stagiaire=new Stagiaire(data['data'][i].id, data['data'][i].username, 
        data['data'][i].email, data['data'][i].mdp, data['data'][i].nom, data['data'][i].prenom,
        new Date(data['data'][i].dateNaiss), data['data'][i].tel, data['data'][i].cin, 
        data['data'][i].adresse, data['data'][i].genre, "../../../assets/"+data['data'][i].photo);
        this.stagiaires.push(s);
      }
    })
  }

  public onOpenModal(stagiaire:Stagiaire, mode:string):void{
    const container=document.getElementById('main-container');
    const button=document.createElement('button');
    button.type='button';
    button.style.display='none';
    button.setAttribute('data-toggle','modal');
    if(mode=='delete'){
      this.deleteStagiaire=stagiaire;
      button.setAttribute('data-target','#deleteStagiaireModal'); 
    }
    container?.appendChild(button);
    button.click();
  }

  supprimer(id:number){
    this.stagiaireService.deleteStagiaire(id).subscribe(data=>{
      if(data["data"]!="Fail")
      window.location.reload()
      this.router.navigate(['/listeTousStagiaires']);
    });
  }

}
