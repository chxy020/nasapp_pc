import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { PageNotFoundComponent } from './components/';
import { WebviewDirective } from './directives/';
import { FormsModule } from '@angular/forms';
import { LoadingModule } from './loading/loading.module';

@NgModule({
	declarations: [PageNotFoundComponent, WebviewDirective],
	imports: [
		CommonModule, 
		TranslateModule, 
		FormsModule,
		LoadingModule
	],
	exports: [
		TranslateModule, 
		WebviewDirective, 
		FormsModule,
		LoadingModule
	]
})
export class SharedModule { }
