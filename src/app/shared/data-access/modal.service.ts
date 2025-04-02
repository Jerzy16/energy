import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ModalData<T = Record<string, unknown>> {
  action: string; 
  item: T; 
}

export interface DynamicItem {
  [key: string]: unknown; 
}


@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private modalDataSubject = new BehaviorSubject<ModalData | null>(null); 
  private isModalOpenSubject = new BehaviorSubject<boolean>(false); 

  modalData$ = this.modalDataSubject.asObservable();

  isModalOpen$ = this.isModalOpenSubject.asObservable();

  openModal<T>(action: 'create' | 'edit' | 'view', item?: T): void {
    this.modalDataSubject.next({ action, item: item || {} });
    this.isModalOpenSubject.next(true);
  }

  closeModal(): void {
    this.modalDataSubject.next(null); 
    this.isModalOpenSubject.next(false);
  }
}
