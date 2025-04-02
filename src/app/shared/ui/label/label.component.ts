import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-label',
  imports: [],
  templateUrl: './label.component.html',
  styleUrl: './label.component.css'
})
export class LabelComponent {
  @Input() label: string = '';
  @Input() required: boolean = false;
}
