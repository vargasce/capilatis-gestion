import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { CanActivateHomePage } from '../Guards/guardHome';
import { ListUserComponent } from './list-user/list-user.component';
import { EmpEditComponent } from './emp-edit/emp-edit.component';
import { NewEmployeeComponent } from './new-employee/new-employee.component';
import { InactiveEmployeeComponent } from './inactive-employee/inactive-employee.component';
import { LogsComponent } from './logs/logs.component';
import { LoadNewsComponent } from './load-news/load-news.component';
import { AwardsComponent } from './awards/awards.component';
import { PresenteeismComponent } from './presenteeism/presenteeism.component';
import { LunchComponent } from './lunch/lunch.component';
import { ExtraHoursComponent } from './extra-hours/extra-hours.component';
import { MassAcceptanceComponent } from './mass-acceptance/mass-acceptance.component';
import { StudyDaysComponent } from './study-days/study-days.component';
import { LicensesComponent } from './licenses/licenses.component';
import { AssetsComponent } from './assets/assets.component';
import { NewAdministratorComponent } from './new-administrator/new-administrator.component';
import { EditAdministratorComponent } from './edit-administrator/edit-administrator.component';
import { ListAdministratorComponent } from './list-administrator/list-administrator.component';
import { OptionsComponent } from './options/options.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [CanActivateHomePage] ,
    children:[
      { path:'listempleado',component: ListUserComponent },
      { path:'editempleado/:legajo',component : EmpEditComponent },
      { path:'newemployee',component : NewEmployeeComponent },
      { path:'inactiveemployee', component : InactiveEmployeeComponent },
      { path:'logs', component: LogsComponent },
      { path:'loadNews', component: LoadNewsComponent },
      { path:'awards', component: AwardsComponent },
      { path:'presenteeism', component: PresenteeismComponent },
      { path:'lunch', component: LunchComponent },
      { path:'extrahours', component: ExtraHoursComponent },
      { path:'massacceptance', component: MassAcceptanceComponent },
      { path:'studyday', component: StudyDaysComponent },
      { path:'licenses', component: LicensesComponent },
      { path:'assets', component: AssetsComponent },
      { path:'listadministrator', component: ListAdministratorComponent },
      { path:'editadministrator/:id_administrador', component: EditAdministratorComponent },
      { path:'newadministrator', component: NewAdministratorComponent },
      { path:'options', component: OptionsComponent },

    ] 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
