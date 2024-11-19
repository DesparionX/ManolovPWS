import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { MessageDto } from '../../../api/models';
import { ActivatedRoute } from '@angular/router';
import moment from 'moment';

@Component({
  selector: 'app-read-message',
  templateUrl: './read-message.component.html',
  styleUrl: './read-message.component.scss'
})
export class ReadMessageComponent implements OnInit, OnDestroy {

  constructor(private api: ApiService, private route: ActivatedRoute) {

  }

  message!: MessageDto;
  sub: any;

  async ngOnInit() {
    await this.getId();
  }


  // Honestly no idea what this doing xD
  // (maybe stop watching for the params ?)
  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  // OTHER //
  // Get the message ID from URL params.
  async getId() {
    this.sub = this.route.params.subscribe(async (params) => {
      if (params['id']) {
        await this.getMessage(params['id']);
      } else {
        console.error("Theres no ID in the URL.");
      }
    })
  }

  // Format date to short date.
  dateFormat(date: string) {
    return moment(date).format('DD MMM YYYY');
  }

  // API //
  // Retrieve the message from db.
  async getMessage(id: string) {
    const response = await this.api.getMessageById(id);
    if (response.succeed) {
      console.log(response.message);
      this.message = response.dto!;
    } else {
      console.error(response.message);
    }
  }
}
