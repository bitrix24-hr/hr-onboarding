import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SurveyService } from './survey.service';
import { WEEK1_SURVEY, MONTH_SURVEY } from './survey.models';
import { Welcome } from './welcome';
import { RatingStep } from './rating-step';
import { CommentStep } from './comment-step';
import { Thankyou } from './thankyou';

@Component({
  selector: 'app-survey',
  standalone: true,
  imports: [Welcome, RatingStep, CommentStep, Thankyou],
  templateUrl: './survey.html',
  styleUrl: './survey.scss',
})
export class Survey implements OnInit {
  survey = inject(SurveyService);
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.survey.userId.set(params['userId'] || 'demo');
      this.survey.userName.set(params['name'] || '');
    });

    this.route.data.subscribe(data => {
      const type = data['surveyType'] || 'week1';
      this.survey.config.set(type === 'month' ? MONTH_SURVEY : WEEK1_SURVEY);
    });
  }

  onNext(): void {
    if (this.survey.nextStep()) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  onPrev(): void {
    this.survey.prevStep();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async onSubmit(): Promise<void> {
    await this.survey.submit();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
