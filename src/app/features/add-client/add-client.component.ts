import { Component } from '@angular/core';
import { Household } from 'src/app/models/household.model';
import { Boiler } from 'src/app/models/boiler.model';
import { pb } from 'src/lib/pocketbase';
import { AuthenticationService } from 'src/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrl: './add-client.component.css',
})
export class AddClientComponent {
  household: Household = new Household(0, '', '', '');

  _familyName!: HTMLInputElement;
  _postalCode!: HTMLInputElement;
  _city!: HTMLInputElement;
  userId: string = '';

  constructor(
    protected authService: AuthenticationService,
    private router: Router
  ) {}

  async ngonInit() {
    this.userId = await this.authService.getUserid();
    console.log(this.userId);
  }

  async createHouseHold() {
    this._familyName = <HTMLInputElement>document.getElementById('familyName');
    this._postalCode = <HTMLInputElement>document.getElementById('postCode');
    this._city = <HTMLInputElement>document.getElementById('city');
    this.userId = await this.authService.getUserid();

    const datahouse = {
      familyName: this._familyName.value,
      postCode: this._postalCode.value,
      City: this._city.value,
      Energiecoach: this.userId,
    };

    console.log(datahouse);

    const record = await pb.collection('household').create(datahouse);

    this.router.navigate(['/customer-overview']);

    console.log(record);
  }
}
