import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { PostRm } from '../../api/models';
import { EntityTypes } from '../../helpers/entityTypes';
import moment from 'moment';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    standalone: false
})
export class HomeComponent implements OnInit{
  constructor(private api: ApiService, private sanitizer: DomSanitizer) { }

  posts: PostRm[] = [];
  


  async ngOnInit() {
    await this.loadPosts();
  }

  // HTML //

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
  async loadPosts() {
    const response = await this.api.getPosts(EntityTypes.POST);
    if (response.succeeded) {
      this.posts = response.posts!;
      console.log(response.message);
    } else {
      console.error(response.message);
    }
  }
}
