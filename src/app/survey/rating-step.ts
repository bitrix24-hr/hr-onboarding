import { Component, input, output, computed, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { SliderRating } from './slider-rating';
import { SurveyStep } from './survey.models';
import { SurveyService } from './survey.service';

@Component({
  selector: 'app-rating-step',
  standalone: true,
  imports: [MatButtonModule, SliderRating],
  templateUrl: './rating-step.html',
  styleUrl: './rating-step.scss',
})
export class RatingStep {
  step = input.required<SurveyStep>();
  stepNumber = input.required<number>();
  totalSteps = input<number>(4);
  next = output<void>();
  prev = output<void>();

  private survey = inject(SurveyService);

  showValidation = false;
  unanswered: string[] = [];

  onRatingChange(key: string, value: number): void {
    this.survey.setAnswer(key, value);
    this.unanswered = this.unanswered.filter(k => k !== key);
  }

  onTextChange(key: string, event: Event): void {
    const value = (event.target as HTMLTextAreaElement).value;
    this.survey.setTextAnswer(key, value);
  }

  isError(key: string): boolean {
    return this.showValidation && this.unanswered.includes(key);
  }

  onNext(): void {
    this.unanswered = this.survey.getUnanswered(this.stepNumber());
    if (this.unanswered.length > 0) {
      this.showValidation = true;
      return;
    }
    this.showValidation = false;
    this.next.emit();
  }
}
