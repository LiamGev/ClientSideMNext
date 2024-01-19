import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/account/login/login.component';
import { OverviewComponent } from './features/overview-customer/overview.component';
import { CalculationDetailComponent } from './features/calculation/calculation-detail/calculation-detail.component';
import { CalculationOverviewComponent } from './features/calculation/calculation-overview/calculation-overview.component';
import { CalculatepageComponent } from './features/calculation/calculatepage/calculatepage.component';
import { EditCalculationComponent } from './features/calculation/edit-calculation/edit-calculation.component';
import { AddClientComponent } from './features/add-client/add-client.component';
import { HomeScreen } from './features/home/home-screen.component';
import { EditClientComponent } from './features/edit-client/edit-client.component';
import { RegisterComponent } from './features/account/register/register.component';
import { UpdateUserDataComponent } from './features/account/updateUserData/update-user-data.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'updateUserData', component: UpdateUserDataComponent },
  { path: '', pathMatch: 'full', component: HomeScreen },

  // Homescreen
  { path: 'home', pathMatch: 'full', component: HomeScreen },

  // Huishouden overzicht
  {
    path: 'customer-overview',
    pathMatch: 'full',
    component: OverviewComponent,
  },

  // Create new calculation
  {
    path: 'calculate',
    pathMatch: 'full',
    component: CalculatepageComponent,
  },

  // edit calculation
  {
    path: 'edit-calculation/:id',
    pathMatch: 'full',
    component: EditCalculationComponent,
  },

  // calculation overview
  {
    path: 'calculation-overview',
    pathMatch: 'full',
    component: CalculationOverviewComponent,
  },

  // calculation overview of specific household
  {
    path: 'calculation-overview/:id',
    pathMatch: 'full',
    component: CalculationOverviewComponent,
  },

  // calculation details page
  {
    path: 'calculation-detail',
    pathMatch: 'full',
    component: CalculationDetailComponent,
  },

  {
    path: 'calculation-detail/:id',
    pathMatch: 'full',
    component: CalculationDetailComponent,
  },

  // add household
  {
    path: 'add-household',
    pathMatch: 'full',
    component: AddClientComponent,
  },

  // edit household
  {
    path: 'edit-household/:id',
    pathMatch: 'full',
    component: EditClientComponent,
  },

  { path: '**', redirectTo: '' },
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
