import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InscriptionComponent } from './components/inscription/inscription.component';
import { AccueilComponent } from './components/accueil/accueil.component';
import { AuthentificationComponent } from './components/authentification/authentification.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DemandeStageComponent } from './components/stagiaire/demande-stage/demande-stage.component';
import { ProfilComponent } from './components/stagiaire/profil/profil.component';
import { AjoutStageComponent } from './components/admin/ajout-stage/ajout-stage.component';
import { ListeStagesComponent } from './components/admin/liste-stages/liste-stages.component';
import { StageComponent } from './components/admin/stage/stage.component';
import { ListeTousStagiairesComponent } from './components/admin/liste-tous-stagiaires/liste-tous-stagiaires.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemandesStagiaireComponent } from './components/admin/liste-tous-stagiaires/details-stagiaire/demandes-stagiaire/demandes-stagiaire.component';
import { ListeEncadrantsComponent } from './components/liste-encadrants/liste-encadrants.component';
import { InscriptionEncComponent } from './components/inscription-enc/inscription-enc.component';
import { ProfilEncComponent } from './components/profil-enc/profil-enc.component';
import { ProfilAdmComponent } from './components/admin/profil-adm/profil-adm.component';
import { DemandesSComponent } from './components/demandes-s/demandes-s.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';
import { PanelDemandeComponent } from './components/panel-demande/panel-demande.component';
import { StagesEncComponent } from './components/stages-enc/stages-enc.component';
import { NavbarAdminComponent } from './components/navbar-admin/navbar-admin.component';
import { MenuComponent } from './components/menu/menu.component';
import { MenuAdminComponent } from './components/menu-admin/menu-admin.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { DetailsStagiaireAdmComponent } from './components/details-stagiaire-adm/details-stagiaire-adm.component';
import { MenuEncadrantComponent } from './components/menu-encadrant/menu-encadrant.component';
import { FormBuilder } from '@angular/forms';
import { ProposComponent } from './components/propos/propos.component';
import { ErreurComponent } from './components/erreur/erreur.component';

@NgModule({  
  declarations: [
    AppComponent,
    InscriptionComponent,  
    AccueilComponent,
    AuthentificationComponent,
    NavbarComponent,    
    DemandeStageComponent, 
    ProfilComponent, 
    AjoutStageComponent,
    ListeStagesComponent, 
    StageComponent, 
    ListeTousStagiairesComponent, 
    DemandesStagiaireComponent,
    ListeEncadrantsComponent, 
    InscriptionEncComponent, ProfilEncComponent, ProfilAdmComponent, DemandesSComponent,  
    PanelDemandeComponent, StagesEncComponent, NavbarAdminComponent, MenuComponent, MenuAdminComponent, DetailsStagiaireAdmComponent, MenuEncadrantComponent, ProposComponent, ErreurComponent, 
  ], 
  imports: [
    BrowserModule,
    AppRoutingModule, 
    HttpClientModule, 
    ReactiveFormsModule, 
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    MatDialogModule,
    MatDatepickerModule,
    MatSelectModule,
    MatMenuModule   ,
    Ng2SearchPipeModule, 
  ],
  providers: [],
  bootstrap: [AppComponent]
}) 
export class AppModule { }
