import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageRoutes } from './naslist.routing';
import { SharedModule } from '../../shared/shared.module';
import { NasListComponent } from './naslist.component';

@NgModule({
	imports: [
		CommonModule,
		PageRoutes,
		SharedModule
	],
	declarations: [
		NasListComponent,
		// CarouselSensePipe,
		// DelSensePipe,
		// SenseSharedKeySearchPipe
	]
})
export class NasListModule { }
