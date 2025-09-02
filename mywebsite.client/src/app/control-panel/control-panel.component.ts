import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-control-panel',
    templateUrl: './control-panel.component.html',
    styleUrl: './control-panel.component.scss',
    standalone: false
})
export class ControlPanelComponent implements OnInit {
  constructor(private router: Router) { }

  ngOnInit() {
    
  }
}
