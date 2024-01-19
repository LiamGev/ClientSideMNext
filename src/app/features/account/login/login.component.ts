import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { pb } from 'src/lib/pocketbase';
import { AuthenticationService } from 'src/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {}
  _userName!: HTMLInputElement;
  _password!: HTMLInputElement;
  errorMessage: string = '';

  ngOnInit(): void {
    console.log('Yoooo we here');
    this._userName = <HTMLInputElement>document.getElementById('userName');
    this._password = <HTMLInputElement>document.getElementById('password');
  }

  async login() {
    try {
      await this.authService.login(this._userName.value, this._password.value);

      if (this.authService.loggedIn) {
        // Navigate to the home page
        this.router.navigate(['/']);
      }
    } catch (error) {
      console.error('Login error:', error);
      this.errorMessage = 'Gebruikersnaam of wachtwoord is incorrect';
    }
  }

  async reloadPage() {
    location.reload();
  }
}
