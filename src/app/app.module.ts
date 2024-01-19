import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OverviewComponent } from './features/overview-customer/overview.component';
import { LoginComponent } from './features/account/login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './navbar/navbar.component';
import { CalculationDetailComponent } from './features/calculation/calculation-detail/calculation-detail.component';
import { CalculatepageComponent } from './features/calculation/calculatepage/calculatepage.component';
import { FormsModule } from '@angular/forms';
import { AddClientComponent } from './features/add-client/add-client.component';
import { CalculationOverviewComponent } from './features/calculation/calculation-overview/calculation-overview.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { HomeScreen } from './features/home/home-screen.component';
import { EditClientComponent } from './features/edit-client/edit-client.component';
import { EditCalculationComponent } from './features/calculation/edit-calculation/edit-calculation.component';
import { RegisterComponent } from './features/account/register/register.component';
import { UpdateUserDataComponent } from './features/account/updateUserData/update-user-data.component';
import { CommonModule, NgIf } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    OverviewComponent,
    LoginComponent,
    RegisterComponent,
    AddClientComponent,
    CalculationOverviewComponent,
    HomeScreen,
    EditClientComponent,
    EditCalculationComponent,
    UpdateUserDataComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    NgIf,
    CommonModule,
    NavbarComponent,
    CalculationDetailComponent,
    CalculatepageComponent,
    FormsModule,
    NavbarComponent,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
