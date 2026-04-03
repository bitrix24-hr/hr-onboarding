import { Component, output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SurveyService } from './survey.service';

@Component({
  selector: 'app-comment-step',
  standalone: true,
  imports: [FormsModule, MatButtonModule, MatInputModule, MatFormFieldModule],
  templateUrl: './comment-step.html',
  styleUrl: './comment-step.scss',
})
export class CommentStep {
  prev = output<void>();
  submit = output<void>();

  survey = inject(SurveyService);
  comment = '';
  sending = false;

  async onSubmit(): Promise<void> {
    this.sending = true;
    this.survey.comment.set(this.comment);
    this.submit.emit();
  }
}
