// confirmation-modal.component.ts
import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Bevestig verwijdering</h4>
      <button
        type="button"
        class="close"
        aria-label="Close"
        (click)="activeModal.dismiss('cancel')"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">Weet u zeker dat u dit item wilt verwijderen?</div>
    <div class="modal-footer">
      <button
        type="button"
        class="btn btn-secondary"
        (click)="activeModal.dismiss('cancel')"
      >
        Annuleren
      </button>
      <button
        type="button"
        class="btn btn-danger"
        (click)="activeModal.close('confirm')"
      >
        Verwijderen
      </button>
    </div>
  `,
})
export class ConfirmationModalComponent {
  @Input() itemId?: string;

  constructor(public activeModal: NgbActiveModal) {}
}
