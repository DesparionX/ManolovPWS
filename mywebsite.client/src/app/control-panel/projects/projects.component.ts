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
    selector: 'app-projects',
    templateUrl: './projects.component.html',
    styleUrl: './projects.component.scss',
    standalone: false
})
export class ProjectsComponent implements OnInit {
  constructor(private apiServices: ApiService, private readonly dialog: MatDialog) {

  }
  projects: PostRm[] = [];
  entityType = EntityTypes.PROJECT;

  async ngOnInit() {
    await this.loadProjects();
  }


  // HTML //
  // Delete dialog.
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
  // Load projects.
  async loadProjects() {
    let response: GetPostsResponse = await this.apiServices.getPosts(this.entityType);
    if (response.succeeded) {
      response.posts?.forEach(post => {
        this.projects.push(post);
      })
    }
  }
}
