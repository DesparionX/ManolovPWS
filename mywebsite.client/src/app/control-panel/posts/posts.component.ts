import { Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { GetPostsResponse, PostRm } from '../../api/models';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { DeleteDialogComponent } from '../../custom-components/delete-dialog/delete-dialog.component';
import { EntityTypes } from '../../helpers/entityTypes';


@Component({
    selector: 'app-posts',
    templateUrl: './posts.component.html',
    styleUrl: './posts.component.scss',
    standalone: false
})
export class PostsComponent implements OnInit {
  constructor(private apiServices: ApiService, private readonly dialog: MatDialog) {

  }
  posts: PostRm[] = [];
  entityType = EntityTypes.POST;

  async ngOnInit() {
    await this.loadAllPosts();
  }

  // HTML //
  // Pop up confirmation dialog.

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, whatToDelete: string, id: string): void {
    this.dialog.open(DeleteDialogComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
          entityType: whatToDelete,
          id: id
      }
    });
  }

  // API //
  // Load posts.
  async loadAllPosts() {
    const response: GetPostsResponse = await this.apiServices.getPosts('Post');
    if (response.succeeded) {
      this.posts = response.posts!;
    }
  }
}
