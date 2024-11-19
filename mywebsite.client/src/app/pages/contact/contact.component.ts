import { Component, ElementRef, OnInit, ViewChild, viewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { MessageDto } from '../../api/models';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit {

  constructor(private fb: FormBuilder, private apiService: ApiService) {

  }
  @ViewChild("error") msgLabel!: ElementRef<HTMLLabelElement>;

  msg: string | undefined;

  form = this.fb.nonNullable.group({
    username: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(20)])],
    mail: ['', Validators.compose([Validators.required, Validators.email])],
    message: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(1000)])]
  });

  ngOnInit() {

  }

  // HTML Functions

  // Auto grow text area.
  public autoGrow(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  }

// Reset fields.
  resetFields() {
    this.form.get('username')?.reset();
    this.form.get('mail')?.reset();
    this.form.get('message')?.reset();
  }
  

  async send() {
    if (!this.form.invalid) {
      const message: MessageDto = {
        sender: this.form.value.username,
        mail: this.form.value.mail,
        text: this.form.value.message,
        dateSent: new Date().toJSON()
      }

      const response = await this.apiService.sendMessage(message)

      if (response.succeed && response.hasPenalty) {
        this.msg = response.message!;
        this.msgLabel.nativeElement.hidden = false;
        this.msgLabel.nativeElement.classList.add("fail");
      } else if (response.succeed) {
        this.msg = response.message!;
        this.msgLabel.nativeElement.hidden = false;
        this.msgLabel.nativeElement.classList.add("succeed");
        this.resetFields();
      } else {
        this.msg = response.message!;
        this.msgLabel.nativeElement.hidden = false;
        this.msgLabel.nativeElement.classList.add("fail");
      }
    }
  }
}

