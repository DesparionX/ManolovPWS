import { Component, EventEmitter, OnDestroy, OnInit, Output, ChangeDetectionStrategy, ChangeDetectorRef, inject, AfterViewInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, Validators, FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AddPostResponse, FindPostResponse, PostDto, PostRm, UpdatePostResponse } from '../../api/models';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrl: './add-edit.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddEditComponent implements OnInit, OnDestroy {

  constructor(private fb: FormBuilder,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef) {

  }
  @Output() public onUploadFinished = new EventEmitter();
  @ViewChild('fileUpload') images!: ElementRef<HTMLInputElement>;
  
  // Used for images.
  uploadedPictures: string[] = [];
  dbPictures: string[] = [];
  allPictures: string[] = [];
  // Used for URL parameters.
  sub: any;

  // Post related.
  postInDb!: PostRm;
  postId = '';

  // Custom bools.
  isEditing: boolean = false;
  isProject: boolean = false;

  // HTML related
  additButton: string | undefined | null;
  projectTypeValue: string | undefined;

  form = this.fb.nonNullable.group({
    title: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(40)])],
    description: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(2000)])],
    projectType: [''],
    link: [''],
    
  })



  async ngOnInit() {
    this.sub = this.route.params.subscribe(async (params) => {
      if (params['id']) {
        await this.fetchPost(params['id']);
        this.editMode();
      } else {
        this.addMode(params['type']);
      }
      
    })
  }



  // Custom functions
  private editMode() {
    this.isEditing = true;
    this.additButton = "Update";
    this.cdr.markForCheck();
    
    const post: PostDto = {
      id: this.postInDb.id,
      title: this.postInDb.title!,
      description: this.postInDb.description!,
      type: this.postInDb.type,
      projectType: this.postInDb.projectType,
      link: this.postInDb.link,
      pictures: this.postInDb.pictures
    };

    if (this.postInDb.type!.toLowerCase() == 'project') {
      this.isProject = true;
    }

    this.loadFields(post);
  }

  private addMode(type: string) {
    this.isEditing = false;
    this.additButton = "Add";
    this.isProject = type.toLowerCase() == 'project' ? true : false;
  }

  private loadFields(post: PostDto) {
    this.postId = post.id!;
    this.form.get('title')?.setValue(post.title);
    this.form.get('description')?.setValue(post.description);
    this.form.get('projectType')?.setValue(post.projectType!);
    this.dbPictures = post.pictures!;
    this.form.get('link')?.setValue(post.link!);
    this.allPictures = this.dbPictures;
  }

  // HTML functions
  public onImageSelect(files: FileList): void {
    if (files.length > 0) {
      if (files.length + this.allPictures.length > 9) {
        console.error("Too much images ! You may upload maximum 9."); 
        
        return;
      }
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.uploadedPictures.push(e.target.result);
          this.allPictures.push(e.target.result);
          console.log(e.target.result);
          this.cdr.detectChanges();
        };
        reader.readAsDataURL(file)
      });
    }
  }
  public autoGrow(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  }
  

  // Crud operations

  //Add or Update post/project
  async addit() {
    if (this.form.invalid) {
      console.error('Form is invalid.');
      return;
    }
    console.log(this.projectTypeValue);
    const dto: PostDto = {
      id: this.postId,
      title: this.form.value.title!,
      description: this.form.value.description!,
      type: this.isProject ? 'Project' : 'Post',
      pictures: this.uploadedPictures,
      projectType: this.form.get('projectType')?.value,
      link: this.form.value.link
    }
    console.log(dto);

    let response: UpdatePostResponse | AddPostResponse = await this.apiService.additPost(dto, this.isEditing);
    if (response.succeed) {
      console.log(response.message)
      this.router.navigate(['/control-panel/']);
    } else {
      console.error('Something went wrong: ', response.message);
    }
  }

  // Find post/project via ID.
  async fetchPost(id: string) {
    let response: FindPostResponse = await this.apiService.findPost(id);
    if (response.succeed) {
      console.log(response);
      this.postInDb = response.post!;
      console.log(this.postInDb);
    } else {
      console.error('Something went wrong: ', response.message);
    }
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
