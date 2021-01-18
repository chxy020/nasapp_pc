import { Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';


const routes: Routes = [
	{  path:'**',component:LoginComponent }
];

export const PageRoutes = RouterModule.forChild(routes);
