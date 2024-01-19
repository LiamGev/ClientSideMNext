import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Boiler } from 'src/app/models/boiler.model';
import { pb } from 'src/lib/pocketbase';
import { PdfService } from 'src/services/pdf.service';
import { Household } from 'src/app/models/household.model';

@Component({
  selector: 'app-edit-calculation',
  templateUrl: './edit-calculation.component.html',
  styleUrl: './edit-calculation.component.css',
})
export class EditCalculationComponent {
  households: string[] = [];
  boilerId: string = '';

  householdsFromDB: any[] = [];
  selectedHousehold: string = '';
  newFamilyName: string = '';
  newFamilyPostcode: string = '';
  newFamilyCity: string = '';

  @ViewChild('dataToExport', { static: false })
  public dataToExport!: ElementRef;
  baseData: string | null = null;
  shot_loading = false;

  constructor(private pdfService: PdfService, private route: ActivatedRoute) {}
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
  rhousehold: Household = new Household(0, '', '', '');
  boiler = new Boiler(0, 0, '', 0, 0, this.rhousehold, '', 0, 0, 0, 0, 0, '');

  async ngOnInit() {
    this.loadHouseholds();

    this.route.params.subscribe(async (params) => {
      this.boilerId = params['id'];
      this.boiler = await pb.collection('Boiler').getOne(this.boilerId);
      this.boiler.Liters = this.boiler.Liters;
      this.boiler.Prijs_in_euro = this.boiler.Prijs_in_euro;
      this.boiler.Elektrisch_vermogen = this.boiler.Elektrisch_vermogen;
      this.boiler.Energie_label = this.boiler.Energie_label;
      this.boiler.Titel = this.boiler.Titel;
      this.boiler.Household = this.boiler.Household;
      this.boiler.DownTimeLossDay = this.boiler.DownTimeLossDay;
      this.boiler.DownTimeLossYear = this.boiler.DownTimeLossYear;
      this.boiler.HeatFifteenToSeventy = this.boiler.HeatFifteenToSeventy;
      this.boiler.TimeToHeat = this.boiler.TimeToHeat;
      this.boiler.OneTimeHeat = this.boiler.OneTimeHeat;
      this.boiler.Opmerkingen = this.boiler.Opmerkingen;

      const kostenStilstandverlies = <HTMLElement>(
        document.getElementById('kostenStilstandverlies')
      );
      const kostenOpwarmen = <HTMLElement>(
        document.getElementById('kostenOpwarmen')
      );
      const tijdVerwarmen = <HTMLElement>(
        document.getElementById('tijdVerwarmen')
      );
      const energieOpwarmen = <HTMLElement>(
        document.getElementById('energieOpwarmen')
      );
      const stilstandverliesPerDag = <HTMLElement>(
        document.getElementById('stilstandverliesPerDag')
      );

      kostenOpwarmen!.innerHTML = this.boiler.OneTimeHeat.toFixed(2);
      tijdVerwarmen!.innerHTML = (this.boiler.TimeToHeat * 60)
        .toFixed(2)
        .toString();
      energieOpwarmen!.innerHTML = this.boiler.HeatFifteenToSeventy.toFixed(3);
      stilstandverliesPerDag!.innerHTML =
        this.boiler.DownTimeLossDay.toFixed(3);
      kostenStilstandverlies!.innerHTML =
        this.boiler.DownTimeLossYear.toFixed(2);

      console.log(this.boiler);
    });

    this._amountLitres = <HTMLInputElement>(
      document.getElementById('amountLitres')
    );
    this._priceKwh = <HTMLInputElement>document.getElementById('priceKwh');
    this._electrical = <HTMLInputElement>document.getElementById('electrical');
    this._energielabelSelect = <HTMLInputElement>(
      document.getElementById('energielabelSelect')
    );
    this._amountLitres.value = '70';
    this._title = <HTMLInputElement>document.getElementById('title');
    this._household = <HTMLInputElement>document.getElementById('household');
    if (this._household) {
      console.log('household bound');
      this._household.addEventListener(
        'input',
        this.updateCalculationValues.bind(this)
      );
    }
    if (this._title) {
      console.log('title bound');
      this._title.addEventListener(
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
  }

  updateCalculationValues(event: Event) {
    console.log('binding working');
    this.calculate(
      parseInt(this._amountLitres.value),
      parseFloat(this._priceKwh.value),
      parseInt(this._electrical.value),
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
      timeNeededToHeatField.innerHTML = this._timeNeededToHeat.toFixed(2);
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
    console.log(this._amountEnergyFifteenToSeventy);
  }

  toggleNewFamilyFields() {
    const newFamilyFields = document.querySelector('.new-family-fields');
    if (newFamilyFields) {
      newFamilyFields.classList.toggle('visible');
    }
  }

  async updateCalculation(id: string) {
    this._title = <HTMLInputElement>document.getElementById('Titel');
    this._amountLitres = <HTMLInputElement>(
      document.getElementById('amountLitres')
    );
    this._priceKwh = <HTMLInputElement>document.getElementById('priceKwh');
    this._electrical = <HTMLInputElement>document.getElementById('electrical');
    this._energielabelSelect = <HTMLInputElement>(
      document.getElementById('energielabelSelect')
    );
    this._household = <HTMLInputElement>document.getElementById('household');
    this._timeNeededToHeat = this._timeNeededToHeat;
    this._costOfHeatOnce = this._costOfHeatOnce;
    this._costStilstandverliesDay = this._costStilstandverliesDay;
    this._costStilstandverliesYear = this._costStilstandverliesYear;
    this._amountEnergyFifteenToSeventy = this._amountEnergyFifteenToSeventy;

    await pb.collection('Boiler').update(id, {
      Titel: this._title.value,
      Liters: parseInt(this._amountLitres.value),
      Prijs_in_euro: parseFloat(this._priceKwh.value),
      Elektrisch_vermogen: parseInt(this._electrical.value),
      Energie_label: this._energielabelSelect.value,
      Opmerkingen: '',
      OneTimeHeat: this._costOfHeatOnce.toFixed(2),
      DownTimeLossYear: this._costStilstandverliesYear.toFixed(2),
      HeatFifteenToSeventy: this._amountEnergyFifteenToSeventy.toFixed(2),
      TimeToHeat: this._timeNeededToHeat.toFixed(2),
      DownTimeLossDay: this._costStilstandverliesDay.toFixed(2),
      Household: this._household.value,
    });
  }

  async loadHouseholds() {
    this.householdsFromDB = await pb.collection('Household').getFullList({
      sort: '-created',
    });
  }
}
