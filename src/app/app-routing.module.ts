import { RouterModule, Routes } from "@angular/router";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { AuthGuard } from "./guard/auth.guard";
import { TicketTableComponent } from "./ticket-table/ticket-table.component";
import { TicketComponent } from "./ticket/ticket.component";

const routes: Routes = [

  {
    path: 'tickets',
    component: TicketComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_USER'] },
  },
  { path: '', component: AppComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' },
];


@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }