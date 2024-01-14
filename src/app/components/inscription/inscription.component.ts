import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Encadrant } from 'src/app/classes/encadrant';
import { Stagiaire } from 'src/app/classes/stagiaire';
import { EncadrantService } from 'src/app/services/encadrant.service';
import { StagiaireService } from 'src/app/services/stagiaire.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {

  formInscri:FormGroup; 

  constructor(public serviceEncadrant:EncadrantService,public serviceStagiaire:StagiaireService,
    public fb:FormBuilder, public router:Router) { }
 
  ngOnInit(): void {
    this.formInscri=this.fb.group({
      nom:['', [Validators.required]],
      prenom:['', [Validators.required]],
      email:['', [
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
      ]],
      mdp:['', [
        Validators.required,
        Validators.minLength(6)
      ]],
      dateNaiss:['',Validators.required],
      genre:['',Validators.required],
      adresse:['',Validators.required],
      image:[],
      cin:['', [
        Validators.required,
        Validators.pattern("[0-9]{8}")
      ]],
      username:['', Validators.required],
      tel:['', [
        Validators.required,
        Validators.pattern("[0-9]{8}")
      ]],
  });
}


  /* file upload */
     /* Variabe to store file data */
     filedata:any;
    /* File onchange event */
    fileEvent(e:any){
        this.filedata =<File>e.target.files[0];
    }

    onSubmit(){   
      let myFormData = new FormData();
      const headers = new HttpHeaders();
      headers.append('Content-Type', 'multipart/form-data');
      headers.append('Accept', 'application/json');
      myFormData.append('image', this.filedata);
      
        var s:Stagiaire=new Stagiaire(0, this.formInscri.get('username').value, this.formInscri.get('email').value,
        this.formInscri.get('mdp').value, this.formInscri.get('nom').value, this.formInscri.get('prenom').value,
        this.formInscri.get('dateNaiss').value, this.formInscri.get('tel').value, this.formInscri.get('cin').value, 
        this.formInscri.get('adresse').value, this.formInscri.get('genre').value, this.formInscri.get('image').value);
        this.serviceStagiaire.inscription(s,myFormData,headers).subscribe(res =>console.log(res));
        console.log(this.formInscri.value); 
        window.location.reload()
        this.router.navigate(['/accueil']);
    }

    get email() {
      return this.formInscri.controls["email"];
    }
    get mdp() {
      return this.formInscri.controls["mdp"];
    }
    get nom() {
      return this.formInscri.controls["nom"];
    }
    get prenom() {
      return this.formInscri.controls["prenom"];
    }
    get dateNaiss(){
      return this.formInscri.controls["dateNaiss"];
    }
    get genre() {
      return this.formInscri.controls["genre"];
    }
    get type() {
      return this.formInscri.controls["type"];
    }
    get image() {
      return this.formInscri.controls["image"];
    }
    get adresse(){
      return this.formInscri.controls["adresse"];
    }
    get cin(){
      return this.formInscri.controls["cin"];
    }
    get tel(){
      return this.formInscri.controls["tel"];
    }
    get username(){
      return this.formInscri.controls["username"];
    }

    

}
