import { formatDate } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild, ViewEncapsulation, viewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CertificateDto, ContactDto, Cvdto, EducationDto, LanguageDto, LoadCvResponse, SkillDto, WorkExperienceDto } from '../../api/models';
import { ApiService } from '../../services/api.service';
import { ContactIcons } from '../../services/contactIcons';
import moment, { Moment } from 'moment';



@Component({
  selector: 'app-edit-cv',
  templateUrl: './edit-cv.component.html',
  styleUrl: './edit-cv.component.scss',
})
export class EditCVComponent implements OnInit, AfterViewInit {

  constructor(private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private apiService: ApiService
  ) {

  }
  @ViewChild('male') maleLabel!: ElementRef<HTMLLabelElement>;
  @ViewChild('female') femaleLabel!: ElementRef<HTMLLabelElement>;
  @ViewChild('fileUpload') images!: ElementRef<HTMLInputElement>;

  @Output() public onUploadFinished = new EventEmitter();

  tempAvatar: string | undefined;
  cv: Cvdto | undefined;
  contactsList: ContactDto[] = [];
  jobsList: WorkExperienceDto[] = [];
  educationList: EducationDto[] = [];
  skillsList: SkillDto[] = [];
  languagesList: LanguageDto[] = [];
  certificatesList: CertificateDto[] = [];

  contactsOptions: string[] = [];
  
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
    skillType: [''],
    skill: [''],
    level: [''],
    langType: [''],
    lang: [''],
    read: [''],
    write: [''],
    speak: [''],
    certiTitle: [''],
    company: [''],
    certiLink: [''],
  })

  async ngOnInit() {
    this.form.get('isMale')?.setValue('true');
    await this.fetchCV();
    await this.initializeForms();
    await this.fillFields(this.cv!);
  }
  ngAfterViewInit() {
    this.genderSelected();
  }

  //HTML Functions

  // Fill fields after fetching the CV from DB.
  async fillFields(cv: Cvdto) {
    this.tempAvatar = cv.picture!;
    this.form.get('fullName')?.setValue(cv.fullName!);
    this.form.get('isMale')?.setValue(cv.isMale!.toString());
    this.form.get('birthDate')?.setValue(cv.birthDate!);
    this.form.get('nationality')?.setValue(cv.nationality!);
    this.form.get('address')?.setValue(cv.address!);
    this.form.get('description')?.setValue(cv.description!);
    this.form.get('profession')?.setValue(cv.profession!);

    await this.fillContacts(cv);
    await this.fillJobsList(cv);
    await this.fillEducationList(cv);
    await this.fillSkillsList(cv);
    await this.fillLanguagesList(cv);
    await this.fillCertificatesList(cv);
  }

  // Initialize HTML Forms.
  async initializeForms() {
    this.fillContactsMenu();
  }

  dateFormat(date: string) {
    return moment(date).format('YYYY-MM-DD');
  }

  // Avatar upload
  public onImageSelect(files: FileList): void {
    if (files.length > 0) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.tempAvatar = e.target.result;
        console.log(e.target.result);
        this.cdr.detectChanges();
      };
      reader.readAsDataURL(files[0]);
    }
  }

  // Gender switch
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

  // CONTACTS //
  // Determine contact icon.
  contactIcon(domain: string): string {
    switch (domain) {
      case 'facebook': {
        return ContactIcons.FACEBOOK_64;
      }
      case 'instagram': {
        return ContactIcons.INSTAGRAM_64;
      }
      case 'linkedIn': {
        return ContactIcons.LINKEDIN_64;
      }
      case 'discord': {
        return ContactIcons.DISCORD_64;
      }
      case 'gitHub': {
        return ContactIcons.GITHUB_64;
      }
      default: {
        return '';
      }
    }
  }

  // Fill Contact select menu.
  fillContactsMenu() {
    this.contactsOptions = [
      'facebook',
      'instagram',
      'linkedIn',
      'discord',
      'gitHub'
    ]
  }

  // Remove contact from the list.
  removeContact(contact: ContactDto) {
    const index = this.contactsList.findIndex(cont => cont === contact);
    if (index !== -1) {
      this.contactsList.splice(index, 1)
    }
  }

  // Add contact.
  addContact() {
    const contactDomain = this.form.get('contactIcon')?.value;
    const contactUsername = this.form.get('title')?.value;
    if ((contactDomain!.length > 0) && (contactUsername!.length > 0)) {
      this.contactsList.push({
        domain: contactDomain!,
        username: contactUsername!
      })
      this.form.get('contactIcon')?.reset();
      this.form.get('title')?.reset();
    }
  }

  // WORK EXPERIENCE //
  // Remove job from the jobs list.
  removeJob(job: WorkExperienceDto) {
    const index = this.jobsList.findIndex(j => j === job);
    if (index !== -1) {
      this.jobsList.splice(index, 1);
    }
    console.log(this.jobsList);
  }

  // Add job to the jobs list.
  addJob() {
    const position = this.form.get('workPosition')?.value;
    const description = this.form.get('workDescription')?.value;
    const startDate = this.form.get('startDate')?.value;
    const endDate = this.form.get('endDate')?.value;

    //const startDate = moment(startDateRaw).format('DD.MM.YYYY');
    //const endDate = moment(endDateRaw).format('DD.MM.YYYY');
    if ((position!.length > 0) && (description!.length > 0) && (startDate !== null) && (endDate !== null)) {
      this.jobsList.push({
        position: position!,
        description: description!,
        startDate: startDate!,
        endDate: endDate!
      });

      this.form.get('workPosition')?.reset();
      this.form.get('workDescription')?.reset();
      this.form.get('startDate')?.reset();
      this.form.get('endDate')?.reset();
    }
  }

  // EDUCATION //
  // Remove education from the list.
  removeEducation(education: EducationDto) {
    const index = this.educationList.findIndex(e => e === education);
    if (index !== -1) {
      this.educationList.splice(index, 1);
    }
  }

  // Add education.
  addEducation() {
    const schoolName = this.form.get('schoolName')?.value;
    const educationType = this.form.get('educationType')?.value;
    const professionAquired = this.form.get('professionAquired')?.value;
    const educationDescription = this.form.get('educationDescription')?.value;
    const eduStartDate = this.dateFormat(this.form.get('eduStartDate')?.value.toString()!); /*this.form.get('eduStartDate')?.value.toString();*/
    const eduEndDate = this.dateFormat(this.form.get('eduEndDate')?.value.toString()!);     /*this.form.get('eduEndDate')?.value.toString();*/

    //const eduStartDate = moment(eduStartDateRaw).format('DD.MM.YYYY');
    //const eduEndDate = moment(eduEndDateRaw)?.format('DD.MM.YYYY');
    if (schoolName!.length > 0
      && educationType!.length > 0
      && professionAquired!.length > 0
      && educationDescription!.length > 0
      && eduStartDate!.length > 0
      && eduEndDate!.length > 0) {

      this.educationList.push({
        schoolName: schoolName!,
        educationType: educationType!,
        professionAquired: professionAquired!,
        description: educationDescription!,
        startDate: eduStartDate!,
        endDate: eduEndDate!
      });

      this.form.get('schoolName')?.reset();
      this.form.get('educationType')?.reset();
      this.form.get('professionAquired')?.reset();
      this.form.get('educationDescription')?.reset();
      this.form.get('eduStartDate')?.reset();
      this.form.get('eduEndDate')?.reset();
    }
  }

  // SKILLS //
  // Remove skill from the skills list.
  removeSkill(skill: SkillDto) {
    const index = this.skillsList.findIndex(s => s === skill);
    if (index !== -1) {
      this.skillsList.splice(index, 1);
    }
  }

  // Add skill.
  addSkill() {
    const skillType = this.form.get('skillType')?.value;
    const skill = this.form.get('skill')?.value;
    const skillLevel = Number(this.form.get('level')?.value);

    if (skillType!.length > 0 && skill!.length > 0 && skillLevel! !== (null || undefined)) {
      this.skillsList.push({
        type: skillType!,
        skillName: skill!,
        level: skillLevel
      })

      this.form.get('skillType')?.reset();
      this.form.get('skill')?.reset();
      this.form.get('level')?.reset();
    }
  }

  // LANGUAGE //
  // Remove language from the list.
  removeLanguage(language: LanguageDto) {
    const index = this.languagesList.findIndex(l => l === language)
    if (index !== -1) {
      this.languagesList.splice(index, 1);
    }
  }

  // Add language to the list.
  addLanguage() {
    const langType = this.form.get('langType')?.value;
    const lang = this.form.get('lang')?.value;
    const read = this.form.get('read')?.value;
    const write = this.form.get('write')?.value;
    const speak = this.form.get('speak')?.value;

    if (langType!.length > 0 && lang!.length > 0 && read!.length > 0 && write!.length > 0 && speak!.length > 0) {
      this.languagesList.push({
        name: lang!,
        type: langType!,
        readLevel: read!,
        writeLevel: write!,
        talkLevel: speak!
      })

      this.form.get('langType')?.reset();
      this.form.get('lang')?.reset();
      this.form.get('read')?.reset();
      this.form.get('write')?.reset();
      this.form.get('speak')?.reset();
    }
  }

  // CERTIFICATES //
  // Remove certificate from the list.
  removeCertificate(certi: CertificateDto) {
    const index = this.certificatesList.findIndex(c => c === certi);
    if (index !== -1) {
      this.certificatesList.splice(index, 1);
    }
  }

  // Add certificate in the list.
  addCertificate() {
    const certiTitle = this.form.get('certiTitle')?.value;
    const company = this.form.get('company')?.value;
    const certiLink = this.form.get('certiLink')?.value;

    if (certiTitle!.length > 0 && company!.length > 0 && certiLink!.length > 0) {
      this.certificatesList.push({
        title: certiTitle!,
        company: company!,
        link: certiLink!
      })

      this.form.get('certiTitle')?.reset();
      this.form.get('company')?.reset();
      this.form.get('certiLink')?.reset();
    }
  }

  // Api functions
  // Load the CV from db and fetch it to local variable.
  async fetchCV() {
    let response: LoadCvResponse = await this.apiService.getCv();
    if (response.succeed) {
      console.log(response.message);
      this.cv = response.cv;
      console.log(this.cv);
    } else {
      console.error('Something went wrong.', response.message);
      console.log(response);
    }
  }

  async fillContacts(cv: Cvdto) {
    if (cv.contacts !== null) {
      Array.from(cv.contacts!).forEach(contact => {
        this.contactsList.push(contact);
      })
    }
  }

  async fillJobsList(cv: Cvdto) {
    if (cv.workExperience !== null) {
      Array.from(cv.workExperience!).forEach(job => {
        this.jobsList.push(job);
      })
    }
  }

  async fillEducationList(cv: Cvdto) {
    if (cv.education !== null) {
      Array.from(cv.education!).forEach(education => {
        this.educationList.push(education)
      })
    }
  }

  async fillSkillsList(cv: Cvdto) {
    if (cv.skills !== null) {
      Array.from(cv.skills!).forEach(skill => {
        this.skillsList.push(skill);
      })
    }
  }

  async fillLanguagesList(cv: Cvdto) {
    if (cv.languages !== null) {
      Array.from(cv.languages!).forEach(language => {
        this.languagesList.push(language);
      })
    }
  }

  async fillCertificatesList(cv: Cvdto) {
    if (cv.certificates !== null) {
      Array.from(cv.certificates!).forEach(certificate => {
        this.certificatesList.push(certificate);
      })
    }
  }

  async editCV() {
    console.log(this.dateFormat(this.form.value.birthDate!.toString()))
    this.cv!.picture = this.tempAvatar;
    this.cv!.fullName = this.form.value.fullName;
    this.cv!.isMale = Boolean(this.form.value.isMale);
    this.cv!.birthDate = this.dateFormat(this.form.value.birthDate!.toString());
    this.cv!.nationality = this.form.value.nationality;
    this.cv!.address = this.form.value.address;
    this.cv!.contacts = this.contactsList;
    this.cv!.description = this.form.value.description;
    this.cv!.profession = this.form.value.profession;
    this.cv!.workExperience = this.jobsList;
    this.cv!.education = this.educationList;
    this.cv!.skills = this.skillsList;
    this.cv!.languages = this.languagesList;
    this.cv!.certificates = this.certificatesList;

    console.log(this.cv!.toString() + 'before calling the update.')

    const response = await this.apiService.updateCV(this.cv!)
    if (response.succeed) {
      console.log(response);
      //window.location.reload();
    } else {
      console.error(response.message);
    }
  }
}
