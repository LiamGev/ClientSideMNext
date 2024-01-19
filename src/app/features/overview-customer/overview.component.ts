// overview.component.ts
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { pb } from 'src/lib/pocketbase';
import { ConfirmationModalComponent } from '../confirmDeletion/delete-confirmation.modal';

interface Family {
  id: string;
  familyName: string;
  postCode: string;
  City: string;
  Energiecoach: string;
}

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css'],
})
export class OverviewComponent implements OnInit {
  households: Family[] = [];

  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {
    console.log('Load Households');
    this.loadFamilies();
  }

  async loadFamilies() {
    this.households = await pb.collection('Household').getFullList({
      sort: '-created',
    });
  }

  async deleteFamily(id: string) {
    const modalRef = this.modalService.open(ConfirmationModalComponent);
    modalRef.componentInstance.householdId = id;

    modalRef.result.then(
      async (result) => {
        if (result === 'confirm') {
          await pb.collection('Household').delete(id);
          await this.loadFamilies(); // Reload families after deletion
          console.log('deleted');
        }
      },
      (reason) => {
        // Handle modal dismissal (e.g., canceled)
      }
    );
  }
}
