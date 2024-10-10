import { ChangeDetectionStrategy, Component, Inject, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { DeleteRequest } from '../../api/models';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrl: './delete-dialog.component.scss',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogClose],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteDialogComponent implements OnInit{

  constructor(@Inject(MAT_DIALOG_DATA) public data: DeleteRequest,
    private dialogRef: MatDialogRef<DeleteDialogComponent>,
    private apiService: ApiService,
  private router: Router) {

  }
  //readonly dialogRef = inject(MatDialogRef<DeleteDialogComponent>)

  ngOnInit() {
  }

  async confirmDelete(type: string, id: string) {
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
      console.error(this.data.postType + ' not deleted: ', result.message);
    }
  }
}
