import { Routes } from '@angular/router';
import { Survey } from './survey/survey';

export const routes: Routes = [
  { path: '', component: Survey, data: { surveyType: 'week1' } },
  { path: 'week1', component: Survey, data: { surveyType: 'week1' } },
  { path: 'month', component: Survey, data: { surveyType: 'month' } },
  { path: '**', redirectTo: '' },
];
