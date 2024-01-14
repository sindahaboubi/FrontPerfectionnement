import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Direction } from 'src/app/classes/direction';
import { Encadrant } from 'src/app/classes/encadrant';
import { EncadrantService } from 'src/app/services/encadrant.service';

@Component({
  selector: 'app-liste-encadrants',
  templateUrl: './liste-encadrants.component.html',
  styleUrls: ['./liste-encadrants.component.css']
})
export class ListeEncadrantsComponent implements OnInit {

  encadrants:Encadrant[]=[];
  nom:string;
  public deleteEncadrant: Encadrant;
  directions:Direction[]=[];
  val:any;

  constructor(private encadrantService:EncadrantService, private router:Router) { }

  ngOnInit(): void {

    this.encadrantService.getDirections().subscribe(direction =>{
      for(let i=0;i<direction['data'].length;i++){ 
        this.directions.push(new Direction((Number)(direction['data'][i].id),direction['data'][i].libelle));
      }
    });

    this.encadrantService.getEncadrant().subscribe(data=>{
      for(let i=0;i<data['data'].length;i++){
        let e:Encadrant=new Encadrant(data['data'][i].id, data['data'][i].username, 
        data['data'][i].email, data['data'][i].mdp, data['data'][i].nom, data['data'][i].prenom,
        new Date(data['data'][i].dateNaiss), data['data'][i].tel, data['data'][i].cin, 
        data['data'][i].adresse, data['data'][i].genre, data['data'][i].specialite,
        data['data'][i].iddirection);
        this.encadrants.push(e);
      }
    })
  }

  onOpenModal(mode:string):void{
    const container=document.getElementById('main-container');
    const button=document.createElement('button');
    button.type='button';
    button.style.display='none';
    button.setAttribute('data-toggle','modal');
    if(mode=='addEnc'){
      button.setAttribute('data-target','#addEncModal'); 
    }
    container?.appendChild(button);
    button.click();
  }

  public onOpen(encadrant:Encadrant, mode:string):void{
    const container=document.getElementById('main-container');
    const button=document.createElement('button');
    button.type='button';
    button.style.display='none';
    button.setAttribute('data-toggle','modal');
    if(mode=='delete'){
      this.deleteEncadrant=encadrant;
      button.setAttribute('data-target','#deleteEncadrantModal'); 
    }
    container?.appendChild(button); 
    button.click();
  }

  supprimer(id:number){
    this.encadrantService.deleteEncadrant(id).subscribe(data=>{
      if(data["data"]!="Fail")
      window.location.reload()
      this.router.navigate(['/listeEncadrants']);
    });
  }

  

}
