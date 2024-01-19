import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCalculationComponent } from './edit-calculation.component';

describe('EditCalculationComponent', () => {
  let component: EditCalculationComponent;
  let fixture: ComponentFixture<EditCalculationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditCalculationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditCalculationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
