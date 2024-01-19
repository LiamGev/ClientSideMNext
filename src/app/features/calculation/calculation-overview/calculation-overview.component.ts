import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { pb } from 'src/lib/pocketbase';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { Household } from 'src/app/models/household.model';
import { ConfirmationModalComponent } from '../../confirmDeletion/delete-confirmation.modal';

interface Calculation {
  id: string;
  name: string;
  date: Date;
  Liters: Number;
  Household: string;
  collectionName: string;
  updated: Date;
}

@Component({
  selector: 'app-calculation-overview',
  templateUrl: './calculation-overview.component.html',
  styleUrls: ['./calculation-overview.component.css'],
})
export class CalculationOverviewComponent implements OnInit {
  calculations: Calculation[] = [];
  householdId: string = '';
  household: Household = new Household(0, '', '', '');

  constructor(private route: ActivatedRoute, private modalService: NgbModal) {}

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
    console.log('Load calculations');
    this.loadCalculations();
  }

  async loadCalculations() {
    this.calculations = await pb.collection('Boiler').getFullList({
      sort: '-created',
    });

    var calcs = this.calculations.filter(
      (c) => c.Household == this.householdId
    );
    this.calculations = calcs;

    // Log 'liters' property for each calculation
    this.calculations.forEach((calculation) => {
      console.log(
        `Calculation ID: ${calculation.id}, Liters: ${calculation.Liters}, Huishouden: ${calculation.Household}`
      );
    });
  }

  async deleteCalculation(id: string) {
    const modalRef = this.modalService.open(ConfirmationModalComponent);
    modalRef.componentInstance.itemId = id;

    modalRef.result.then(
      async (result) => {
        if (result === 'confirm') {
          await pb.collection('Boiler').delete(id);
          await this.loadCalculations();
          console.log('Calculation deleted');
        }
      },
      (reason) => {
        // Handle modal dismissal (e.g., canceled)
      }
    );
  }
}
