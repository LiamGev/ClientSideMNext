import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PdfService } from 'src/services/pdf.service';
import { pb } from 'src/lib/pocketbase';
import { DataService } from 'src/services/data.service';

interface Calculation {
  id: string;
  Liters: string;
  Prijs_in_euro: string;
  Elektrisch_vermogen: string;
  Energie_label: string;
  OneTimeHeat: number;
  DownTimeLossYear: number;
  HeatFifteenToSeventy: number;
  TimeToHeat: number;
  DownTimeLossDay: number;
  Opmerkingen: string;
  Household: string;
  User: string;
  Titel: string;
}

@Component({
  selector: 'app-calculation-detail',
  templateUrl: './calculation-detail.component.html',
  styleUrls: ['./calculation-detail.component.css'],
  standalone: true,
})
export class CalculationDetailComponent implements OnInit {
  energyCoachName: string = '';
  householdName: string = '';

  calculation: Calculation = {
    id: '',
    Liters: '0',
    Prijs_in_euro: '0',
    Elektrisch_vermogen: '0',
    Energie_label: '',
    OneTimeHeat: 0,
    DownTimeLossYear: 0,
    HeatFifteenToSeventy: 0,
    TimeToHeat: 0,
    DownTimeLossDay: 0,
    Opmerkingen: '',
    Household: '',
    User: '',
    Titel: '',
  };

  constructor(
    private route: ActivatedRoute,
    private pdfService: PdfService,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      console.log('ID:', id);
      if (id) {
        this.loadCalculation(id);
      }
    });
  }

  async loadCalculation(id: string): Promise<void> {
    try {
      // load calculation
      this.calculation = await pb.collection('Boiler').getOne(id);

      console.log('getUserData');
      await this.getUserData();
      console.log('getHouseholdData');
      await this.getHouseholdData();

      console.log('Calculation:', this.calculation);
    } catch (error) {
      console.error('Error loading calculation:', error);
    }
  }

  private async getUserData(): Promise<void> {
    console.log('Klant: ', this.calculation.Household);

    // Find UserName based on the ID from calculation.User
    // get user data using id
    const userId = this.calculation.User;

    try {
      const user: any = await this.dataService.getUserById(userId);

      console.log('User:', user);

      if (user) {
        this.energyCoachName = user.name;
        console.log('User Name:', this.energyCoachName);
      } else {
        console.error('User is undefined.');
      }
    } catch (getUserError) {
      console.error('Error getting user:', getUserError);
    }
  }

  // get household/family name using the household id
  private async getHouseholdData(): Promise<void> {
    console.log('Household: ', this.calculation.Household);

    const householdId = this.calculation.Household;

    try {
      const household: any = await pb
        .collection('Household')
        .getOne(householdId);
      console.log('Household:', household);

      if (household) {
        this.householdName = household.familyName;
        console.log('Household Name:', this.householdName);
      } else {
        console.error('Household is undefined.');
      }
    } catch (getHouseholdError) {
      console.error('Error getting household:', getHouseholdError);
    }
  }

  public downloadAsPdf(): void {
    const currentDate = new Date();

    if (this.calculation) {
      console.log('Calculation data:', this.calculation);
      console.log('Household Name:', this.householdName);
      console.log('Energy Coach Name:', this.energyCoachName);

      this.pdfService.downloadAsPdf(
        this.calculation.Liters,
        this.calculation.Prijs_in_euro,
        this.calculation.Elektrisch_vermogen,
        this.calculation.Energie_label,
        this.calculation.OneTimeHeat,
        this.calculation.DownTimeLossYear,
        this.calculation.DownTimeLossDay,
        this.calculation.TimeToHeat,
        this.calculation.HeatFifteenToSeventy,
        this.householdName,
        this.calculation.Opmerkingen,
        this.energyCoachName,
        currentDate,
        this.calculation.Titel
      );
    }
  }
}
