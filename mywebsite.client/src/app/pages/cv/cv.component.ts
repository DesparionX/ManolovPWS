import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CountryIcons } from '../../helpers/countryIcons';
import { ContactIcons } from '../../helpers/contactIcons';

@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrl: './cv.component.scss'
})
export class CvComponent implements OnInit{

  constructor(private api: ApiService) { }

  countryIcon = CountryIcons.BULGARIA;
  collapsed: boolean = true;
  maxHeight: string = '0';

  ngOnInit() {
    console.log(this.maxHeight);
    console.log(this.collapsed);
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

  // Expand or collapse skills list.
  switchView(type: string, element: HTMLElement) {
    switch (type) {
      case 'skills':
        this.collapsed = !this.collapsed;
        if (this.collapsed == false) {
          const totalHeight = Array.from(element.children).reduce((height, child: any) => {
            return height + child.offsetHeight;
          }, 0);
          this.maxHeight = totalHeight+'px';
        } else {
          this.maxHeight = '0';
        }
        console.log(this.collapsed);
        console.log(this.maxHeight);
        
        break;
      default:
        console.log("Something is missing.");
        break;
    }
  }
}
