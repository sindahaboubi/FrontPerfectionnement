import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Encadrant } from 'src/app/classes/encadrant';
import { EncadrantService } from 'src/app/services/encadrant.service';

@Component({
  selector: 'app-profil-enc',
  templateUrl: './profil-enc.component.html',
  styleUrls: ['./profil-enc.component.css']
})
export class ProfilEncComponent implements OnInit {

  formValueEnc : FormGroup; 
  btnUpdateShow:boolean = false;
  btnSaveShow:boolean = true;
  imgstr:string; 
  
  constructor(private encadrantService:EncadrantService, private activatedRouter:ActivatedRoute,private router:Router,
    private formBuilder:FormBuilder) { }

    id:number=this.activatedRouter.snapshot.params['id'];
    public currentEncadrant:Encadrant;

  ngOnInit(): void {
    this.encadrantService.getEncadrantById(this.id).subscribe
    (data => {
      this.currentEncadrant=new Encadrant((Number)(data['data'].id), data['data'].username, 
      data['data'].email, data['data'].mdp, data['data'].nom, data['data'].prenom, 
      new Date(data['data'].dateNaiss), data['data'].tel, data['data'].cin, data['data'].adresse, 
      data['data'].genre, data['data'].specialite, data['data'].iddirection)
      this.imgstr="../../../assets/"+data['data'].photo;
      console.log(data['data'])
    });

    this.formValueEnc = this.formBuilder.group({
      username:['',Validators.required],
      email:['', [
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
      ]],
      mdp:['',[
        Validators.required,
        Validators.minLength(6)
      ]],
      tel:['', [
        Validators.required,
        Validators.pattern("[0-9]{8}")
      ]],
      adresse:[''],
  })
  }

  EditEncadrant(data:any){
    this.UpdateShowBtn();
    this.formValueEnc.controls['username'].setValue(data.username);
    this.formValueEnc.controls['email'].setValue(data.email);
    this.formValueEnc.controls['mdp'].setValue(data.mdp);
    this.formValueEnc.controls['tel'].setValue(data.tel);
    this.formValueEnc.controls['adresse'].setValue(data.adresse);
  }

  UpdateShowBtn()
{
  this.btnUpdateShow = true;
  this.btnSaveShow = false;
}

UpdateEncadrant(){
  let e=new Encadrant((Number)(this.currentEncadrant.id), this.formValueEnc.value['username'], 
  this.formValueEnc.value['email'], this.formValueEnc.value['mdp'], '', '', null, 
  this.formValueEnc.value['tel'], '', this.formValueEnc.value['adresse'], '','', (Number)(this.formValueEnc.value['iddirection']));
  console.log(e);
  this.encadrantService.putEncadrant(e).subscribe(res => {
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

get tel(){
  return this.formValueEnc.get('tel');
}
get mdp(){
  return this.formValueEnc.get('mdp');
} 
get username(){ 
  return this.formValueEnc.get('username');
}
get email(){ 
  return this.formValueEnc.get('email');
}

}
