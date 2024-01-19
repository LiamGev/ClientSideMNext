// authentication.service.ts

import { Injectable } from '@angular/core';
import { pb } from 'src/lib/pocketbase';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  loggedIn: boolean = false;
  userActivated: boolean = false;
  user: any = '';
  userId: string = '';
  energieCoachName: string = '';

  constructor(protected dataService: DataService) {
    // Check login status initially
    this.updateLoginStatus();

    // check if user account is activated
    this.accountStatus();

    // Subscribe to authentication changes
    pb.authStore.onChange((token: string | null) => {
      this.loggedIn = !!token;
    });
  }

  updateLoginStatus() {
    this.loggedIn = pb.authStore.isValid;
  }

  accountStatus() {
    const pocketbaseAuthData = localStorage.getItem('pocketbase_auth');
    const authData = pocketbaseAuthData ? JSON.parse(pocketbaseAuthData) : null;

    console.log('Auth Data:', authData);
    console.log('pocketbaseAuthData:', pocketbaseAuthData);

    if (authData && authData.model && authData.model.isActive == true) {
      this.userId = authData.model.id;
      this.energieCoachName = authData.model.name;
      this.userActivated = true;
    }

    if (authData && authData.model && authData.model.isActive == false) {
      this.userId = authData.model.id;
      this.energieCoachName = authData.model.name;
      this.userActivated = false;
    }
  }

  async login(userName: string, password: string): Promise<void> {
    const authData = await this.dataService.userLogin(userName, password);

    if (pb.authStore.isValid) {
      // Additional logic if needed
      this.loggedIn = true;
    }
  }

  logOut() {
    this.loggedIn = false;
    pb.authStore.clear();
  }

  async getUserid() {
    return this.userId;
  }

  getEnergyCoachName() {
    return this.energieCoachName;
  }
}
