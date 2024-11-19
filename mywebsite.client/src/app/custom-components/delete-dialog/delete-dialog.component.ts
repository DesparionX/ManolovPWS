import { ChangeDetectionStrategy, Component, Inject, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { DeleteRequest } from '../../api/models';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { EntityTypes } from './entityTypes';
import { DeleteDialogData } from './DeleteDialogData';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrl: './delete-dialog.component.scss',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogClose],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteDialogComponent implements OnInit{

  constructor(@Inject(MAT_DIALOG_DATA) public data: DeleteDialogData,
    private dialogRef: MatDialogRef<DeleteDialogComponent>,
    private apiService: ApiService,
  private router: Router) {

  }

  ngOnInit() {
  }

  async confirmDelete(type: string, id: string) {

    switch (type) {
      case EntityTypes.POST:
      case EntityTypes.PROJECT:
        this.deletePostOrProject(type, id);
        break;
      case EntityTypes.MESSAGE:
        this.deleteMessage(id);
        break;
      default:
        console.error("Couldn't find this entity type !");
        break;
    }
  }

  // API //
  // Delete post/project
  async deletePostOrProject(type: string, id: string) {
    const request: DeleteRequest = {
      postType: type,
      postId: id
    }
    const result = await this.apiService.deletePost(request);
    if (result.succeed) {
      // Here we can add popup later

      console.log(result.message);
      window.location.reload();
    } else {
      console.error(this.data.entityType + ' not deleted: ', result.message);
    }
  }

  async deleteMessage(id: string) {
    const result = await this.apiService.deleteMessage(id);
    if (result.succeed) {
      console.log("Message deleted successfully !");
      window.location.reload();
    } else {
      console.error(result.message)
    }
  }
}
