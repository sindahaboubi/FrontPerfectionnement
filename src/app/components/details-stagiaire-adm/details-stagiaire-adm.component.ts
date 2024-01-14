import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Stagiaire } from 'src/app/classes/stagiaire';
import { StagiaireService } from 'src/app/services/stagiaire.service';

@Component({
  selector: 'app-details-stagiaire-adm',
  templateUrl: './details-stagiaire-adm.component.html',
  styleUrls: ['./details-stagiaire-adm.component.css']
})
export class DetailsStagiaireAdmComponent implements OnInit {

  constructor(public router: Router, private stagiaireSer:StagiaireService, private activatedRouter:ActivatedRoute,
    private fs:FormBuilder, private formBuilder:FormBuilder) { }

    id:number=this.activatedRouter.snapshot.params['id'];
    currentStagiaire:Stagiaire;
    imagestr:string; 
    currentDate = new Date();
    daten:Date;
    imgstr:string;

  ngOnInit(): void {
    this.stagiaireSer.getStagiaireById(this.id).subscribe
    (stagiaires => 
      {
      this.currentStagiaire=new Stagiaire((Number)(stagiaires['data'].id), stagiaires['data'].username, stagiaires['data'].email, 
      stagiaires['data'].mdp, stagiaires['data'].nom, stagiaires['data'].prenom, new Date(stagiaires['data'].dateNaiss), 
      stagiaires['data'].tel, stagiaires['data'].cin, stagiaires['data'].adresse, stagiaires['data'].genre,
      stagiaires['data'].photo) as Stagiaire
      this.imgstr="../../../assets/"+stagiaires['data'].photo;
      this.daten=this.currentStagiaire.dateNaiss;
    }
    );
    this.imagestr = "../../../assets/";
  }

}
