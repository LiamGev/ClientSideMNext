import { Component } from '@angular/core';
import { pb } from 'src/lib/pocketbase';
import { Household } from 'src/app/models/household.model';
import { Boiler } from 'src/app/models/boiler.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrl: './edit-client.component.css',
})
export class EditClientComponent {
  householdId: string = '';
  household: Household = new Household(0, '', '', '');

  constructor(private route: ActivatedRoute, private router: Router) {}

  async ngOnInit() {
    this.route.params.subscribe(async (params) => {
      this.householdId = params['id'];
      this.household = await pb
        .collection('Household')
        .getOne(this.householdId);
      this.household.postCode = this.household.postCode;
      this.household.City = this.household.City;
      console.log(this.household);
    });
  }

  _familyName!: HTMLInputElement;
  _postCode!: HTMLInputElement;
  _City!: HTMLInputElement;

  async updateFamily(id: string) {
    this._familyName = <HTMLInputElement>document.getElementById('familyName');
    this._postCode = <HTMLInputElement>document.getElementById('postCode');
    this._City = <HTMLInputElement>document.getElementById('City');

    await pb.collection('Household').update(id, {
      familyName: this._familyName.value,
      postCode: this._postCode.value,
      City: this._City.value,
    });
    console.log(
      'updated family',
      id,
      this._familyName.value,
      this._postCode.value,
      this._City.value
    );

    this.router.navigate(['/customer-overview']);
  }
}
