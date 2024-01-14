import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Stagiaire } from 'src/app/classes/stagiaire';
import { StagiaireService } from 'src/app/services/stagiaire.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  formValue : FormGroup; 
  btnUpdateShow:boolean = false;
  btnSaveShow:boolean = true;
  imgstr:string;

  constructor(private stagiaireService:StagiaireService, private activatedRouter:ActivatedRoute,private router:Router,
    private formBuilder:FormBuilder) { }
    id:number=this.activatedRouter.snapshot.params['id'];
    public currentStagiaire:Stagiaire;

    ngOnInit(): void {
      this.stagiaireService.getStagiaireById(this.id).subscribe
      (data => {
        this.currentStagiaire=new Stagiaire((Number)(data['data'].id), data['data'].username, data['data'].email,
        data['data'].mdp, data['data'].nom, data['data'].prenom, new Date(data['data'].dateNaiss),
        data['data'].tel, data['data'].cin, data['data'].adresse, data['data'].genre, data['data'].photo)
        this.imgstr="../../../assets/"+data['data'].photo;
        console.log(data['data'])
      });

      this.formValue = this.formBuilder.group({
        username:['', Validators.required],
        email:['', [
          Validators.required,
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
        ]],
        mdp:['', [
          Validators.required,
          Validators.minLength(6)
        ]],
        nom:['', [Validators.required]],
        prenom:['', [Validators.required]], 
        tel:['', [
          Validators.required,
          Validators.pattern("[0-9]{8}")
        ]],
        cin:['', [
          Validators.required,
          Validators.pattern("[0-9]{8}")
        ]],
        adresse:['', Validators.required],
        genre:[''],
    })
    }

  EditStagiaire(data:any){
    this.UpdateShowBtn();
    this.formValue.controls['username'].setValue(data.username);
    this.formValue.controls['email'].setValue(data.email);
    this.formValue.controls['mdp'].setValue(data.mdp);
    this.formValue.controls['nom'].setValue(data.nom);
    this.formValue.controls['prenom'].setValue(data.prenom);
    this.formValue.controls['tel'].setValue(data.tel);
    this.formValue.controls['cin'].setValue(data.cin);
    this.formValue.controls['adresse'].setValue(data.adresse);
    this.formValue.controls['genre'].setValue(data.genre);
  }

  UpdateShowBtn()
{
  this.btnUpdateShow = true;
  this.btnSaveShow = false;
}
 
UpdateStagiaire(){
  let s=new Stagiaire((Number)(this.currentStagiaire.id), this.formValue.value['username'] , 
  this.formValue.value['email'], this.formValue.value['mdp'], this.formValue.value['nom'], 
  this.formValue.value['prenom'],null,this.formValue.value['tel'], this.formValue.value['cin'], 
  this.formValue.value['adresse'], this.formValue.value['genre'],'');
  console.log(s);
  this.stagiaireService.putStagiaire(s).subscribe(res => {
    alert("Profil modifié avec succés");
    this.SaveShowBtn(); 
  })
}

SaveShowBtn()
{
  this.btnUpdateShow = false;
  this.btnSaveShow = true;
  window.location.reload()
}

get nom(){
  return this.formValue.get('nom');
}
get prenom(){
  return this.formValue.get('prenom');
}
get adresse(){
  return this.formValue.get('adresse');
}
get tel(){
  return this.formValue.get('tel');
}
get mdp(){
  return this.formValue.get('mdp');
} 
get cin(){ 
  return this.formValue.get('cin');
}
get username(){ 
  return this.formValue.get('username');
}
get email(){ 
  return this.formValue.get('email');
}
}
