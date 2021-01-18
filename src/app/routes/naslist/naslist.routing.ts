import { Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NasListComponent } from './naslist.component';


const routes: Routes = [
	{  path:'**',component:NasListComponent }
];

export const PageRoutes = RouterModule.forChild(routes);
