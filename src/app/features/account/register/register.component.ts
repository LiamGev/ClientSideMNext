// register.component.ts

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { pb } from 'src/lib/pocketbase';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private router: Router) {}

  async register() {
    console.log('Register clicked');

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
      password: this.password,
      passwordConfirm: this.confirmPassword,
      name: this.username,
    };

    console.log('before push', data);

    try {
      const register = await pb.collection('users').create(data);
      console.log(register);
    } catch (error) {
      console.error('Error during registration:', error);
    }
    this.router.navigate(['/login']);
  }
}
