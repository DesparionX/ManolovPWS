import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CountryIcons } from '../../helpers/countryIcons';
import { ContactIcons } from '../../helpers/contactIcons';

@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrl: './cv.component.scss'
})
export class CvComponent {

  constructor(private api: ApiService) { }

  countryIcon = CountryIcons.BULGARIA;
  collapsed: boolean = false;


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

  // Expand or collapse skills list.
  switchView(type: string) {
    switch (type) {
      case 'skills':
        this.collapsed = !this.collapsed;
    }
  }
}
