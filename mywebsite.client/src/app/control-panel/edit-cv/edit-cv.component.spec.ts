import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCVComponent } from './edit-cv.component';

describe('EditCVComponent', () => {
  let component: EditCVComponent;
  let fixture: ComponentFixture<EditCVComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditCVComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditCVComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
