// register.component.ts

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { pb } from 'src/lib/pocketbase';
// ... (existing imports)

@Component({
  selector: 'app-updateUserdata',
  templateUrl: './update-user-data.component.html',
  styleUrls: ['./update-user-data.component.css'],
})
export class UpdateUserDataComponent {
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  oldPassword: string = '';
  userid: string = '';
  errorMessage: string = '';

  constructor(private router: Router) {}

  async updateUserData() {
    console.log('update clicked');

    // Retrieve user ID from localStorage
    await this.retrieveUserId();

    // Check if password and confirm password match
    if (this.password !== this.confirmPassword) {
      console.error('Password and Confirm Password do not match');
      return; // Stop registration process
    }

    // Check if password meets the minimum length requirement
    if (this.password.length < 8) {
      console.error('Password should be at least 8 characters long');
      return; // Stop registration process
    }

    const data = {
      username: this.username,
      oldPassword: this.oldPassword,
      password: this.password,
      passwordConfirm: this.confirmPassword,
    };

    console.log('before update', data, 'userid:', this.userid);

    try {
      const updateUserData = await pb
        .collection('users')
        .update(this.userid, data);
      console.log('after update:', updateUserData);
      this.router.navigate(['/']);
    } catch (error) {
      console.error('Error during update:', error);
      this.errorMessage = 'Gebruikersnaam of wachtwoord is incorrect';
    }
  }

  // get logedin userid
  private async retrieveUserId() {
    const pocketbaseAuthData = localStorage.getItem('pocketbase_auth');
    const authData = pocketbaseAuthData ? JSON.parse(pocketbaseAuthData) : null;

    if (authData && authData.model && authData.model.id) {
      this.userid = authData.model.id;
      console.log('User ID is:', this.userid);
    }
  }
}
