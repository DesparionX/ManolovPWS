import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { MessageDto } from '../../api/models';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../../custom-components/delete-dialog/delete-dialog.component';

@Component({
    selector: 'app-inbox',
    templateUrl: './inbox.component.html',
    styleUrl: './inbox.component.scss',
    standalone: false
})
export class InboxComponent implements OnInit {

  constructor(private apiService: ApiService, private deleteDialog: MatDialog) {

  }
  @ViewChild('error') errorMsg!: ElementRef<HTMLLabelElement>;

  messagesList: MessageDto[] = [];
  error: string | undefined;



  async ngOnInit() {
    await this.loadMessages();
   
  }

  // HTML //
  // Show error if messages list is empty.
  checkList() {
    if (this.messagesList === null || this.messagesList.length == 0) {
      this.errorMsg.nativeElement.hidden = false;
      this.error = "There are no messages in the mailbox.";
    }
  }

  // Pop up confirmation dialog.

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, whatToDelete: string, id: string): void {
    this.deleteDialog.open(DeleteDialogComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        entityType: whatToDelete,
        id: id
      }
    });
  }

  // API //
  // Load all messages.
  async loadMessages() {
    const response = await this.apiService.getAllMessages();
    if (response.succeed) {
      console.log(response.message);
      this.messagesList = response.messagesList!;
    } else {
      console.log(response.message);
      this.error = response.message!;
    }
  }

  // Delete message.

}
