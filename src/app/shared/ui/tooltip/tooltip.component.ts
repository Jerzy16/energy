import { CommonModule } from '@angular/common';
import { Component, HostListener, Input } from '@angular/core';

@Component({
  selector: 'app-tooltip',
  imports: [CommonModule],
  templateUrl: './tooltip.component.html',
  styleUrl: './tooltip.component.css',
  standalone: true
})
export class TooltipComponent {
  @Input() text: string = ''; 
  @Input() position: 'top' | 'bottom' | 'left' | 'right' = 'top';

  isVisible = false;

  @HostListener('mouseenter')
  showTooltip() {
    this.isVisible = true;
  }

  @HostListener('mouseleave')
  hideTooltip() {
    this.isVisible = false;
  }
}
