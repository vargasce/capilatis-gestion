import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { GridEmpCustomComponent } from './grid-emp-custom/grid-emp-custom.component';
import { SearchCustomComponent } from './search-custom/search-custom.component';
import { EmployeeDataComponent } from './employee-data/employee-data.component';
import { TitleComponent } from './title/title.component';
import { ModalCustomComponent } from './modal-custom/modal-custom.component';
import { DataUploadNewsComponent } from './data-upload-news/data-upload-news.component';
import { SearchbyperiodNewsComponent } from './searchbyperiod-news/searchbyperiod-news.component';
import { SearchbyfilesNewsComponent } from './searchbyfiles-news/searchbyfiles-news.component';
import { SearchbyemployeeNewsComponent } from './searchbyemployee-news/searchbyemployee-news.component';
import { DaysofleaveNewsComponent } from './daysofleave-news/daysofleave-news.component';
import { SearchbyempSectorGroupNewsComponent } from './searchbyemp-sector-group-news/searchbyemp-sector-group-news.component';
import { AdministratorDataComponent } from './administrator-data/administrator-data.component';
import { OptionsDataComponent } from './options-data/options-data.component';
import { AccordionModule } from 'primeng/accordion';
import { PresenteeismDataComponent } from './presenteeism-data/presenteeism-data.component';
import { AwardDataComponent } from './award-data/award-data.component';
import { StudyDataComponent } from './study-data/study-data.component';
import { NewsDataComponent } from './news-data/news-data.component';
import { LicensesDataComponent } from './licenses-data/licenses-data.component';
import { ExtraHoursDataComponent } from './extra-hours-data/extra-hours-data.component';
import { SearchPeriodCustomComponent } from './search-period-custom/search-period-custom.component';

@NgModule({
  declarations: [
 		GridEmpCustomComponent,
 		SearchCustomComponent,
 		EmployeeDataComponent,
 		TitleComponent,
 		ModalCustomComponent,
 		DataUploadNewsComponent,
 		SearchbyperiodNewsComponent,
 		SearchbyfilesNewsComponent,
 		SearchbyemployeeNewsComponent,
 		DaysofleaveNewsComponent,
 		SearchbyempSectorGroupNewsComponent,
 		AdministratorDataComponent,
 		OptionsDataComponent,
 		PresenteeismDataComponent,
 		AwardDataComponent,
 		StudyDataComponent,
 		NewsDataComponent,
 		LicensesDataComponent,
 		ExtraHoursDataComponent,
 		SearchPeriodCustomComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
	AccordionModule,
  ],
	exports: [
			GridEmpCustomComponent,
			EmployeeDataComponent,
			TitleComponent,
			ModalCustomComponent,
			SearchbyemployeeNewsComponent,
			DataUploadNewsComponent,
			SearchbyperiodNewsComponent,
			SearchbyempSectorGroupNewsComponent,
			AdministratorDataComponent,
			SearchCustomComponent,
			SearchPeriodCustomComponent,
	],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class ComponentsModule { 
    static forRoot(): ModuleWithProviders<any> {
        return {
          ngModule: ComponentsModule
        }
    }
}
