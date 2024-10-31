import { formatDate } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation, viewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';



@Component({
  selector: 'app-edit-cv',
  templateUrl: './edit-cv.component.html',
  styleUrl: './edit-cv.component.scss',
})
export class EditCVComponent implements OnInit, AfterViewInit {

  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef) {

  }
  @ViewChild('male') maleLabel!: ElementRef<HTMLLabelElement>;
  @ViewChild('female') femaleLabel!: ElementRef<HTMLLabelElement>;
  
  form = this.fb.nonNullable.group({
    fullName: [''],
    isMale: [''],
    birthDate: [''],
    nationality: [''],
    address: [''],
    contactIcon: [''],
    description: [''],
    profession: [''],
    workPosition: [''],
    title: [''],
    workDescription: [''],
    startDate: [''],
    endDate: [''],
    schoolName: [''],
    educationType: [''],
    professionAquired: [''],
    educationDescription: [''],
    eduStartDate: [''],
    eduEndDate: [''],

  })

  ngOnInit() {
    this.form.get('isMale')?.setValue('true');
    
  }
  ngAfterViewInit() {
    this.genderSelected();
  }

  //HTML Functions
  genderSelected() {
    console.log(this.form.get('isMale')?.value)
    this.cdr.markForCheck();
    if (this.form.get('isMale')?.value) {
      console.log('male')
      this.maleLabel.nativeElement.classList.add('selected');
      this.femaleLabel.nativeElement.classList.remove('selected');
    } else {
      console.log('female')
      this.femaleLabel.nativeElement.classList.add('selected');
      this.maleLabel.nativeElement.classList.remove('selected');
    }
  }
  //formatDateInput() {
  //  const date = this.form.get('birthDate')?.value;
  //  if (date != null) {
  //    const formated = formatDate(date, 'yyyy/MM/dd', 'en-US')
  //    this.form.get('birthDate')?.setValue(formated);
  //    console.log(formated);
  //  }
  //  this.cdr.markForCheck();
  //}

  async loadCV() {

  }
  async editCV() {

  }
}
