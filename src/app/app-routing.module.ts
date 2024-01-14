import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './components/accueil/accueil.component';
import { AjoutStageComponent } from './components/admin/ajout-stage/ajout-stage.component';
import { ListeStagesComponent } from './components/admin/liste-stages/liste-stages.component';
import { DemandesStagiaireComponent } from './components/admin/liste-tous-stagiaires/details-stagiaire/demandes-stagiaire/demandes-stagiaire.component';
import { ListeTousStagiairesComponent } from './components/admin/liste-tous-stagiaires/liste-tous-stagiaires.component';
import { ProfilAdmComponent } from './components/admin/profil-adm/profil-adm.component';
import { StageComponent } from './components/admin/stage/stage.component';
import { AuthentificationComponent } from './components/authentification/authentification.component';
import { DemandesSComponent } from './components/demandes-s/demandes-s.component';
import { DetailsStagiaireAdmComponent } from './components/details-stagiaire-adm/details-stagiaire-adm.component';
import { InscriptionEncComponent } from './components/inscription-enc/inscription-enc.component';
import { InscriptionComponent } from './components/inscription/inscription.component';
import { ListeEncadrantsComponent } from './components/liste-encadrants/liste-encadrants.component';
import { MenuAdminComponent } from './components/menu-admin/menu-admin.component';
import { MenuEncadrantComponent } from './components/menu-encadrant/menu-encadrant.component';
import { ProfilEncComponent } from './components/profil-enc/profil-enc.component';
import { ProposComponent } from './components/propos/propos.component';
import { StagesEncComponent } from './components/stages-enc/stages-enc.component';
import { DemandeStageComponent } from './components/stagiaire/demande-stage/demande-stage.component';
import { ProfilComponent } from './components/stagiaire/profil/profil.component';
   
const routes: Routes = [
  {path:'',component:AccueilComponent}, 
  {path:'accueil', component:AccueilComponent},  
  {path:'stagiaire/:id', component:ProfilComponent},
  {path:'encadrant/:id', component:ProfilEncComponent},
  {path:'admin/:id', component:ProfilAdmComponent},

  {path:'inscription', component:InscriptionComponent},
  {path:'connexion', component:AuthentificationComponent},
  {path:'propos', component:ProposComponent},

  {path:'demander',component:DemandeStageComponent},

  {path:'ajouterStage',component:AjoutStageComponent},
  {path:'listeStagesAdmin',component:ListeStagesComponent}, 
  {path:'listeStagesAdmin/:id', component:StageComponent},
  {path:'listeTousStagiaires', component:ListeTousStagiairesComponent},
  {path:'listeTousStagiaires/:id', component:DetailsStagiaireAdmComponent},
  {path:'listeTousStagiaires/demandes-stagiaire/:id', component:DemandesStagiaireComponent},  
  {path:'listeEncadrants', component:ListeEncadrantsComponent},
  {path:'listeDemandesStagiaire', component:DemandesSComponent},  
  {path:'inscriptionEnc', component:InscriptionEncComponent},
  
  {path:'mesStagesEnc', component:StagesEncComponent},
]; 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
