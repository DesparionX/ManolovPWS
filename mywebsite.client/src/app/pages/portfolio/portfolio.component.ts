import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { PostRm } from '../../api/models';
import { EntityTypes } from '../../helpers/entityTypes';
import { ProjectTypes } from '../../helpers/projectTypes';
import moment from 'moment';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss',
  animations: [
    trigger('fade', [
      state('visible', style({ opacity: 1 })),
      state('hidden', style({ opacity: 0 })),
      transition('visible => hidden', [animate('0.3s ease')]),
      transition('hidden => visible', [animate('0.3s ease')]),
    ]),
  ],
})
export class PortfolioComponent implements OnInit{

  constructor(private api: ApiService) { }
  @ViewChild('list') list!: ElementRef;

  finishedProjects: PostRm[] = [];
  inProgressProjects: PostRm[] = [];
  currentView: 'Finished' | 'In progress' = 'Finished';
  fadeState = 'visible';

  async ngOnInit() {
    await this.getProjects();
  }

  // HTML //

  // Swap project lists.
  toggleView(view: 'Finished' | 'In progress') {
      this.fadeState = 'hidden';
      setTimeout(() => {
        this.fadeState = 'visible';
        
        this.currentView = view;
      }, 200);

    setTimeout(() => {
      this.list.nativeElement.scrollTop = 0;
    }, 500);
    
  }

  // Formating display date.
  dateFormat(date: string) {
    return moment(date).format('DD MMM YYYY - HH:mm');
  }

  // Convert Base64 to Blob
  openImageInNewTab(dataUrl: string) {
    const byteString = atob(dataUrl.split(',')[1]);
    const mimeString = dataUrl.split(',')[0].split(':')[1].split(';')[0];

    const arrayBuffer = new ArrayBuffer(byteString.length);
    const intArray = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {
      intArray[i] = byteString.charCodeAt(i);
    }

    const blob = new Blob([arrayBuffer], { type: mimeString });
    const blobUrl = URL.createObjectURL(blob);

    window.open(blobUrl, '_blank');
  }

  // API //
  // Retrieve all projects from db then split them in the filtered lists.
  async getProjects() {
    const response = await this.api.getPosts(EntityTypes.PROJECT);
    if (response.succeeded) {
      console.log(response.message);
      this.splitProjects(response.posts!);
    } else {
      console.error(response.message);
    }
  }

  // Split the projects in two lists.
  private splitProjects(projects: PostRm[]) {
    Array.from(projects!).forEach(project => {
      if (project.projectType === ProjectTypes.FINISHED) {
        this.finishedProjects.push(project);
      } else {
        this.inProgressProjects.push(project);
      }
    });
  }
}
