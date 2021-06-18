import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PagesRoutingModule } from  './pages.routing';
import { ListUserComponent } from './list-user/list-user.component';
import { ComponentsModule } from '../Components/components.module';
import { EmpEditComponent } from './emp-edit/emp-edit.component';
import { NewEmployeeComponent } from './new-employee/new-employee.component';
import { ButtonModule } from 'primeng/button';
import { AccordionModule } from 'primeng/accordion';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
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
import { OptionsComponent } from './options/options.component';
import { ListAdministratorComponent } from './list-administrator/list-administrator.component';


@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    ListUserComponent,
    EmpEditComponent,
    NewEmployeeComponent,
    InactiveEmployeeComponent,
    LogsComponent,
    LoadNewsComponent,
    AwardsComponent,
    PresenteeismComponent,
    LunchComponent,
    ExtraHoursComponent,
    MassAcceptanceComponent,
    StudyDaysComponent,
    LicensesComponent,
    AssetsComponent,
    NewAdministratorComponent,
    EditAdministratorComponent,
    OptionsComponent,
    ListAdministratorComponent
  ],
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        PagesRoutingModule,
        ComponentsModule.forRoot(),
        ButtonModule,
        AccordionModule,
        CalendarModule,
        DropdownModule,
        ComponentsModule
    ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class PagesModule {
    static forRoot(): ModuleWithProviders<any> {
        return {
          ngModule: PagesModule
        }
    }
}
