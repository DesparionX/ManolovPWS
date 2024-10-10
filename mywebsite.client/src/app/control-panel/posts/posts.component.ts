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


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss'
})
export class PostsComponent implements OnInit {
  constructor(private apiServices: ApiService, private readonly dialog: MatDialog) {

  }
  posts: PostRm[] = [];

  async ngOnInit() {
    let response: GetPostsResponse = await this.apiServices.getPosts('Post');
    if (response.succeeded) {
      response.posts?.forEach(post => {
        this.posts.push(post);
      })
    }
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, whatToDelete: string, id: string): void {
    this.dialog.open(DeleteDialogComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
          postType: whatToDelete,
          postId: id
      }
    });
  }
}
