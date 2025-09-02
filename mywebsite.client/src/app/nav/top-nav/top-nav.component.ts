import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { LogOutResponse } from '../../api/models';
import { Router } from '@angular/router';
import { UniqueSelectionDispatcher } from '@angular/cdk/collections';

@Component({
    selector: 'app-top-nav',
    templateUrl: './top-nav.component.html',
    styleUrl: './top-nav.component.scss',
    encapsulation: ViewEncapsulation.None,
    standalone: false
})
export class TopNavComponent {
  constructor(private auth: AuthService, private router: Router) {

  }

  logoPath = '../../../assets/images/logoto.png';
  logo2Path = '../../../assets/images/logo2rdy.png'

  // HTML //
  // Send to login page.
  controlPanel() {
    this.router.navigate(['/control-panel/inbox'])
  }

  // API //
  // Determine if user is logged in.
  hasToken(): boolean {
    return localStorage.getItem('token') ? true : false;
  }

  // Log out.
  async logOut() {
    const response: LogOutResponse = await this.auth.logOut();
    if (response.succeed) {
      console.log(response.message);
      this.router.navigate(['/home']);
    } else {
      console.error(response.message);
    }
    
  }
}
