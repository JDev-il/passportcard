import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './core/guards/authentication.guard';

const routes: Routes = [
  {path: '', loadChildren: ()=>import("./shared/layout/layout.module").then(m=>m.LayoutModule), canActivate: [AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
