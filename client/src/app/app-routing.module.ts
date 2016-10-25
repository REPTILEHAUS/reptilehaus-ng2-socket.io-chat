import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';

const routes: Routes = [

	{ path: '', component: HomeComponent  },
  {
    path: '',
    redirectTo: '/',
    pathMatch: 'full'
  },	

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class ClientRoutingModule { }