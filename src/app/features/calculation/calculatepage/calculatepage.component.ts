import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { PdfService } from 'src/services/pdf.service';
import { DataService } from 'src/services/data.service';
import { AuthenticationService } from 'src/services/auth.service';

@Component({
  selector: 'app-calculatepage',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule, FormsModule],
  templateUrl: './calculatepage.component.html',
  styleUrls: ['./calculatepage.component.css'],
})
export class CalculatepageComponent implements OnInit {
  showNewFamilyFields: boolean = false;
  households: any[] = [];
  householdName: string = '';
  userId: string = '';
  energieCoachName: string = '';
  newFamilyName: string = '';
  newFamilyPostcode: string = '';
  newFamilyCity: string = '';

  constructor(
    private pdfService: PdfService,
    private dataService: DataService,
    protected authService: AuthenticationService
  ) {}
  _amountEnergyFifteenToSeventy: number = 0;
  _timeNeededToHeat: number = 0;
  _costOfHeatOnce: number = 0;
  _costStilstandverliesDay: number = 0;
  _costStilstandverliesYear: number = 0;
  _amountLitres!: HTMLInputElement;
  _priceKwh!: HTMLInputElement;
  _electrical!: HTMLInputElement;
  _energielabelSelect!: HTMLInputElement;
  _submitButton!: HTMLElement;
  _title!: HTMLInputElement;
  _household!: HTMLInputElement;
  _opmerkingen!: HTMLInputElement;

  async ngOnInit() {
    //Get userid from logedin user/energiecoach

    this.userId = await this.authService.getUserid();
    this.energieCoachName = this.authService.getEnergyCoachName();

    this._amountLitres = <HTMLInputElement>(
      document.getElementById('amountLitres')
    );
    this._priceKwh = <HTMLInputElement>document.getElementById('priceKwh');
    this._electrical = <HTMLInputElement>document.getElementById('electrical');
    this._energielabelSelect = <HTMLInputElement>(
      document.getElementById('energielabelSelect')
    );
    // this._amountLitres.value = '70';
    this._title = <HTMLInputElement>document.getElementById('title');
    this._household = <HTMLInputElement>document.getElementById('household');
    this._opmerkingen = <HTMLInputElement>(
      document.getElementById('opmerkingen')
    );

    if (this._household) {
      console.log('household bound');
      this._household.addEventListener(
        'input',
        this.updateCalculationValues.bind(this)
      );
    }

    if (this._amountLitres) {
      console.log('amountlitres bound');
      this._amountLitres.addEventListener(
        'input',
        this.updateCalculationValues.bind(this)
      );
    }
    if (this._priceKwh) {
      console.log('price bound');
      this._priceKwh.addEventListener(
        'input',
        this.updateCalculationValues.bind(this)
      );
    }
    if (this._electrical) {
      console.log('vermogen bound');
      this._electrical.addEventListener(
        'input',
        this.updateCalculationValues.bind(this)
      );
    }

    if (this._energielabelSelect) {
      console.log('label bound');
      this._energielabelSelect.addEventListener(
        'input',
        this.updateCalculationValues.bind(this)
      );
    }

    this.updateCalculationValues(new Event('input'));
    this.loadHouseholds();
  }

  // load households from db
  async loadHouseholds() {
    this.households = await this.dataService.loadHouseholds();
  }

  // update calculations on screen
  updateCalculationValues(event: Event) {
    console.log('binding working');
    this.calculate(
      parseFloat(this._amountLitres.value),
      parseFloat(this._priceKwh.value),
      parseFloat(this._electrical.value),
      this._energielabelSelect.value
    );

    // Get references to the result text fields
    console.log(event);
    const amountEnergyFifteenToSeventyField =
      document.getElementById('energieOpwarmen');
    const timeNeededToHeatField = document.getElementById('tijdVerwarmen');
    const costOfHeatOnceField = document.getElementById('kostenOpwarmen');
    const costStilstandverliesDayField = document.getElementById(
      'stilstandverliesPerDag'
    );
    const costStilstandverliesYearField = document.getElementById(
      'kostenStilstandverlies'
    );

    // Update the value of each result text field
    if (amountEnergyFifteenToSeventyField) {
      console.log(amountEnergyFifteenToSeventyField);
      amountEnergyFifteenToSeventyField.innerHTML =
        this._amountEnergyFifteenToSeventy.toFixed(2);
    }
    if (timeNeededToHeatField) {
      timeNeededToHeatField.innerHTML = (this._timeNeededToHeat * 60)
        .toFixed(2)
        .toString();
    }
    if (costOfHeatOnceField) {
      costOfHeatOnceField.innerHTML = this._costOfHeatOnce.toFixed(2);
    }
    if (costStilstandverliesDayField) {
      costStilstandverliesDayField.innerHTML =
        this._costStilstandverliesDay.toFixed(2);
    }
    if (costStilstandverliesYearField) {
      costStilstandverliesYearField.innerHTML =
        this._costStilstandverliesYear.toFixed(2);
    }
  }

  // Make the calculation
  calculate(
    amountLitres: number,
    priceKwh: number,
    electrical: number,
    label: string
  ) {
    console.log('calculating');
    let labelVar = 0;
    if (label == 'A+') {
      labelVar = 5.5 + 3.16 * amountLitres ** 0.4;
    } else if (label == 'A') {
      labelVar = 8.5 + 4.25 * amountLitres ** 0.4;
    } else if (label == 'B') {
      labelVar = 12 + 5.93 * amountLitres ** 0.4;
    } else if (label == 'C') {
      labelVar = 16.66 + 8.33 * amountLitres ** 0.4;
    } else if (label == 'D') {
      labelVar = 21 + 10.33 * amountLitres ** 0.4;
    } else if (label == 'E') {
      labelVar = 26 + 13.66 * amountLitres ** 0.4;
    } else if (label == 'F' || label == 'G') {
      labelVar = 31 + 16.66 * amountLitres ** 0.4;
    }

    const amountEnergyFifteenToSeventy =
      (amountLitres * 4186 * (70 - 15)) / 3600000;
    const timeNeededToHeat = amountEnergyFifteenToSeventy / electrical;
    const costOfHeatOnce = amountEnergyFifteenToSeventy * priceKwh;
    const costStilstandverliesDay = (labelVar * 24) / 1000;
    const costStilstandverliesYear = costStilstandverliesDay * 365;

    this._amountEnergyFifteenToSeventy = amountEnergyFifteenToSeventy;
    this._timeNeededToHeat = timeNeededToHeat;
    this._costOfHeatOnce = costOfHeatOnce;
    this._costStilstandverliesDay = costStilstandverliesDay;
    this._costStilstandverliesYear = costStilstandverliesYear;
  }

  // create new record in db for a new calculation for Boiler
  async createRecord() {
    console.log(' createRecord() called');
    const data = {
      Titel: this._title.value,
      Liters: parseInt(this._amountLitres.value),
      Prijs_in_euro: parseFloat(this._priceKwh.value),
      Elektrisch_vermogen: parseInt(this._electrical.value),
      Energie_label: this._energielabelSelect.value,
      Opmerkingen: this._opmerkingen.value,
      OneTimeHeat: this._costOfHeatOnce.toFixed(2),
      DownTimeLossYear: this._costStilstandverliesYear.toFixed(2),
      HeatFifteenToSeventy: this._amountEnergyFifteenToSeventy.toFixed(2),
      TimeToHeat: this._timeNeededToHeat.toFixed(2),
      DownTimeLossDay: this._costStilstandverliesDay.toFixed(2),
      Household: this._household.value,
      User: this.userId,
    };
    console.log('Data before adding to db:', data);
    const record = await this.dataService.createBoilerRecord(data);
    console.log(record);
  }

  // create new household in DB
  async createNewHousehold() {
    const newFamilyData = {
      familyName: this.newFamilyName,
      postCode: this.newFamilyPostcode,
      City: this.newFamilyCity,
      Energiecoach: this.userId,
    };
    // Add the new family to the database, reload the households from db and close newfamily input fields
    console.log('new Household data:', newFamilyData);
    await this.dataService.createNewHousehold(newFamilyData);
    await this.loadHouseholds();
    this.toggleNewFamilyFields();
  }

  // get household/family name using the household id
  private async getHouseholdNameById(id: string) {
    try {
      const household: any = await this.dataService.getHouseholdById(id);
      if (household) {
        this.householdName = household.familyName;
        console.log('Household Name:', this.householdName);
        return this.householdName;
      } else {
        console.error('Household is undefined.');
        return ''; // or handle the case where household is undefined
      }
    } catch (getHouseholdError) {
      console.error('Error getting household:', getHouseholdError);
      throw getHouseholdError; // rethrow the error to handle it elsewhere if needed
    }
  }

  // open or close new family input fields
  toggleNewFamilyFields() {
    this.showNewFamilyFields = !this.showNewFamilyFields;
  }

  // export as pdf
  public async downloadAsPdf(): Promise<void> {
    this._household = <HTMLInputElement>document.getElementById('household');
    // this.householdName = await this.getHouseholdNameById(this._household.value);

    // Check if the user is logged in
    if (this.authService.loggedIn && this.authService.userActivated == true) {
      // If logged in, retrieve the household name using the household ID
      this.householdName = await this.getHouseholdNameById(
        this._household.value
      );
    } else {
      // If not logged in, use the value of the familyName input field directly
      this.householdName = (<HTMLInputElement>(
        document.getElementById('familyName')
      )).value;
    }

    //await this.getHouseholdNameById();
    this.pdfService.downloadAsPdf(
      this._amountLitres.value,
      this._priceKwh.value,
      this._electrical.value,
      this._energielabelSelect.value,
      this._costOfHeatOnce,
      this._costStilstandverliesYear,
      this._costStilstandverliesDay,
      this._timeNeededToHeat,
      this._amountEnergyFifteenToSeventy,
      this.householdName,
      this._opmerkingen.value,
      this.energieCoachName,
      new Date(),
      this._title.value
    );
  }
}
