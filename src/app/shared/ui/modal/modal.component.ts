import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { TooltipComponent } from "../tooltip/tooltip.component";
import { DynamicItem, ModalData, ModalService } from '../../data-access/modal.service';


@Component({
  selector: 'app-modal',
  imports: [FontAwesomeModule, TooltipComponent],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
  standalone: true
})
export class ModalComponent {
  @Input() title = 'Modal Title';


  modalData: ModalData<DynamicItem> | null = null;
  isModalOpen = false; 

  constructor(private modalService: ModalService) {}

  ngOnInit(): void {
    this.modalService.isModalOpen$.subscribe(isOpen => {
      this.isModalOpen = isOpen;
    });

    this.modalService.modalData$.subscribe(data => {
      this.modalData = data as ModalData<DynamicItem>;
    });
  }

  get modalTitle(): string {
    if (!this.modalData) return '';
    if(this.modalData.action === 'create') return 'Crear nuevo';
    if(this.modalData.action === 'edit') return 'Actualizar';
    if(this.modalData.action === 'view') return 'Detalles';
    return this.title;
  }

  getObjectKeys(obj: DynamicItem): string[] {
    return obj ? Object.keys(obj) : [];
  }

  closeModal(): void {
    this.modalService.closeModal(); 
  }

  faClose = faClose
}
