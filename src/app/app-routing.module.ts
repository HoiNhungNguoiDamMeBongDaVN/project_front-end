import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientRoutingModule } from './clients/client.routing';

const routes: Routes = [
  // {
  //   path: "",
  //   redirectTo: "clients",
  //   pathMatch: "full"
  // },
  {
    path: 'clients',
    pathMatch: "full",
    loadChildren: () => import('./clients/client.routing').then((m) => m.ClientRoutingModule)
  },

];

@NgModule({
  // imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
