import { Injectable, signal, computed } from '@angular/core';
import { SurveyConfig } from './survey.models';

@Injectable({ providedIn: 'root' })
export class SurveyService {
  private readonly APPS_SCRIPT_URL = '';

  readonly answers = signal<Record<string, number>>({});
  readonly textAnswers = signal<Record<string, string>>({});
  readonly comment = signal('');
  readonly currentStep = signal(0);
  readonly config = signal<SurveyConfig | null>(null);
  readonly userId = signal('demo');
  readonly userName = signal('');
  readonly submitted = signal(false);

  readonly totalSteps = computed(() => {
    const cfg = this.config();
    return cfg ? cfg.steps.length + 2 : 0; // welcome + steps + comment/thankyou
  });

  readonly progress = computed(() => {
    const total = this.totalSteps();
    if (total === 0) return 0;
    const step = this.currentStep();
    if (step >= total - 1) return 100;
    return Math.round((step / (total - 2)) * 100);
  });

  setAnswer(key: string, value: number): void {
    this.answers.update(a => ({ ...a, [key]: value }));
  }

  setTextAnswer(key: string, value: string): void {
    this.textAnswers.update(a => ({ ...a, [key]: value }));
  }

  validateStep(stepIndex: number): boolean {
    const cfg = this.config();
    if (!cfg) return false;

    // Welcome (0) and last two steps (comment + thankyou) don't need validation
    if (stepIndex === 0 || stepIndex > cfg.steps.length) return true;

    const step = cfg.steps[stepIndex - 1];
    const ans = this.answers();
    return step.questions
      .filter(q => q.type !== 'text') // text fields are optional
      .every(q => ans[q.key] !== undefined);
  }

  getUnanswered(stepIndex: number): string[] {
    const cfg = this.config();
    if (!cfg || stepIndex === 0 || stepIndex > cfg.steps.length) return [];

    const step = cfg.steps[stepIndex - 1];
    const ans = this.answers();
    return step.questions
      .filter(q => q.type !== 'text')
      .filter(q => ans[q.key] === undefined)
      .map(q => q.key);
  }

  nextStep(): boolean {
    if (!this.validateStep(this.currentStep())) return false;
    this.currentStep.update(s => s + 1);
    return true;
  }

  prevStep(): void {
    this.currentStep.update(s => Math.max(0, s - 1));
  }

  async submit(): Promise<void> {
    const payload = {
      userId: this.userId(),
      surveyType: this.config()?.type,
      timestamp: new Date().toISOString(),
      comment: this.comment(),
      ...this.answers(),
      ...this.textAnswers(),
    };

    console.log('Survey payload:', payload);

    if (this.APPS_SCRIPT_URL) {
      try {
        await fetch(this.APPS_SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } catch (e) {
        console.warn('Submit error:', e);
      }
    }

    this.submitted.set(true);
    this.currentStep.update(s => s + 1);
  }
}
