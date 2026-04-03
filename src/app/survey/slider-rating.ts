import { Component, input, output, signal, computed } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';

@Component({
  selector: 'app-slider-rating',
  standalone: true,
  imports: [MatSliderModule],
  templateUrl: './slider-rating.html',
  styleUrl: './slider-rating.scss',
})
export class SliderRating {
  label = input.required<string>();
  value = input<number>(0);
  showError = input<boolean>(false);
  valueChange = output<number>();

  currentValue = signal(0);

  readonly ticks = [1, 2, 3, 4, 5];
  private readonly labels = ['', 'Совсем не удовлетворён', 'Скорее нет', 'Нейтрально', 'Скорее да', 'Полностью да'];

  valueLabel = computed(() => this.labels[this.currentValue()] || '');

  onValueChange(val: number): void {
    this.currentValue.set(val);
    this.valueChange.emit(val);
  }
}
