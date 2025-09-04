import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CountryIcons } from '../../helpers/countryIcons';
import { ContactIcons } from '../../helpers/contactIcons';
import { Cvdto, SkillDto } from '../../api/models';
import moment from 'moment';

@Component({
    selector: 'app-cv',
    templateUrl: './cv.component.html',
    styleUrl: './cv.component.scss',
    standalone: false
})
export class CvComponent implements OnInit, AfterViewInit{

  constructor(private api: ApiService) { }

  loading = true;
  cv!: Cvdto;
  mainSkillsList: SkillDto[] = [];
  otherSkillsList: SkillDto[] = [];

  countryIcon = CountryIcons.BULGARIA;

  // For skills list.
  skillsActive: boolean = false;
  skillsMaxHeight: string = '0'; 

  // Info lists active and max-height.
  @ViewChild('description') desc!: ElementRef<HTMLDivElement>;
  descActive: boolean = false;
  empActive: boolean = false;
  eduActive: boolean = false;
  certiActive: boolean = false;

  descMaxHeight: string = '0';
  empMaxHeight: string = '0';
  eduMaxHeight: string = '0';
  certiMaxHeight: string = '0';


  async ngOnInit() {
    await this.loadCV();
  }

  ngAfterViewInit() {
    
    setTimeout(() => {
      this.activateDescription();
    }, 500);
    
  }

  // HTML //
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

  // Format date.
  dateFormat(date: string) {
    return moment(date).format('DD MMM YYYY');
    
  }

  // Expand or collapse skills list.
  switchView(type: string, element: HTMLElement) {
    switch (type) {
      case 'skills':
        this.skillsActive = !this.skillsActive;
        this.turnView(this.skillsActive, element, (height) => this.skillsMaxHeight = height);
        break;
      case 'description':
        this.descActive = !this.descActive;
        this.turnView(this.descActive, element, (height) => this.descMaxHeight = height);
        break;
      case 'employment':
        this.empActive = !this.empActive;
        this.turnView(this.empActive, element, (height) => this.empMaxHeight = height);
        break;
      case 'education':
        this.eduActive = !this.eduActive;
        this.turnView(this.eduActive, element, (height) => this.eduMaxHeight = height);
        break;
      case 'certificates':
        this.certiActive = !this.certiActive;
        this.turnView(this.certiActive, element, (height) => this.certiMaxHeight = height);
        break;
      default:
        console.log("Something is missing.");
        break;
    }
  }

  // Set the given element's max-height.
  private turnView(active: boolean, element: HTMLElement, setMaxHeight: (height: string) => void) {
    if (active == true) {
      const totalHeight = this.calculateTotalHeight(element);
      setMaxHeight((totalHeight + 5) + 'px');
    } else {
      setMaxHeight('0');
    }
  }
  private calculateTotalHeight(element: HTMLElement): number {
    return Array.from(element.children).reduce((height, child) => {
      const childElement = child as HTMLElement | HTMLDivElement;
      return height + childElement.scrollHeight + this.calculateTotalHeight(childElement);
    }, 0)
  }

  // Set description active by default.
  activateDescription() {
    this.descActive = true;
    this.turnView(this.descActive, this.desc.nativeElement, (height) => this.descMaxHeight = height);
  }

  // API //
  // Load the CV from db.
  async loadCV() {
    const result = await this.api.getCv();
    if (result.succeed) {
      this.cv = result.cv!;
      this.cv.workExperience?.sort((a, b) =>
        new Date(a.startDate!).getTime() - new Date(b.startDate!).getTime());

      this.fetchSkills();
      this.loading = false;
    } else {
      console.error(result.message);
    }
  }

  private fetchSkills() {
    Array.from(this.cv.skills!).forEach(skill => {
      if (skill.type?.toLowerCase() === 'main') {
        this.mainSkillsList.push(skill);
      } else {
        this.otherSkillsList.push(skill);
      }
    })
  }
}
