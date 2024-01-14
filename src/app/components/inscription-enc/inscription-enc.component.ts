import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Direction } from 'src/app/classes/direction';
import { Encadrant } from 'src/app/classes/encadrant';
import { EncadrantService } from 'src/app/services/encadrant.service';

@Component({
  selector: 'app-inscription-enc',
  templateUrl: './inscription-enc.component.html',
  styleUrls: ['./inscription-enc.component.css']
}) 
export class InscriptionEncComponent implements OnInit {

  formInscri:FormGroup; 
  li: any;
  username = new FormControl()
  password = new FormControl()
  email = new FormControl()


  constructor(public serviceEncadrant:EncadrantService, public fb:FormBuilder, public router:Router,private http:HttpClient) { }

  directions:Direction[]=[];

  ngOnInit(): void {
    this.serviceEncadrant.getDirections().subscribe(type =>{
      for(let i=0;i<type['data'].length;i++){
        this.directions.push(new Direction((Number)(type['data'][i].id),type['data'][i].libelle));
      }
    });

    this.formInscri=this.fb.group({
      nom:['', [Validators.required]],
      prenom:['', [Validators.required]],
      email:[],
      mdp:[],
      dateNaiss:['',Validators.required,],
      genre:[],
      adresse:[],
      cin:['', [
        Validators.required,
        Validators.pattern("[0-9]{8}")
      ]],
      username:[],
      tel:['', [
        Validators.required,
        Validators.pattern("[0-9]{8}")
      ]],
      specialite:['',Validators.required],
      dir:['',Validators.required]
  });
  }

    onSubmit(){   
      let myFormData = new FormData();
      const headers = new HttpHeaders();
      headers.append('Content-Type', 'multipart/form-data');
      headers.append('Accept', 'application/json');

        var e:Encadrant=new Encadrant(0, this.formInscri.get('username').value, this.formInscri.get('email').value,
        this.formInscri.get('mdp').value, this.formInscri.get('nom').value, this.formInscri.get('prenom').value,
        this.formInscri.get('dateNaiss').value, this.formInscri.get('tel').value, this.formInscri.get('cin').value, 
        this.formInscri.get('adresse').value, this.formInscri.get('genre').value, this.formInscri.get('specialite').value,
        this.formInscri.get('dir').value);
        this.serviceEncadrant.inscription(e,myFormData,headers).subscribe(res =>{
          if(res["data"]!="Fail"){
            this.formInscri.reset();
            window.location.reload();
          }else if(res["data"]=="Fail"){
            document.getElementById("result").innerHTML="Cet encadrant existe déjà !";
            document.getElementById("result").classList.add("alert-danger");
          }
        });
        this.mail(this.formInscri.get('username').value,this.formInscri.get('email').value,this.formInscri.get('mdp').value)
        console.log(this.formInscri.value); 
    }

    mail(x:string,y:string,z:string){
      let json ={
        username:x,
        email:y,
        password:z
      } 
      console.log(json)
      this.http.post("http://localhost/projetStageBack/mail.php",json).subscribe(data=>{
        this.li = data
        if (this.li.result == "OK") {
          console.log("Mail envoyée")
        }
        else {
          console.log("Mail non envoyée")
        }
      })
    }

    get nom() {
      return this.formInscri.controls["nom"];
    }
    get prenom() {
      return this.formInscri.controls["prenom"];
    }
    get cin() {
      return this.formInscri.controls["cin"];
    }
    get tel() {
      return this.formInscri.controls["tel"];
    }
    get dateNaiss() {
      return this.formInscri.controls["dateNaiss"];
    }
    get specialite() {
      return this.formInscri.controls["specialite"];
    }
    get dir() {
      return this.formInscri.controls["dir"];
    }
    

}
