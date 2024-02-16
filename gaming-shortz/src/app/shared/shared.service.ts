import { Injectable, signal } from '@angular/core';

interface IModal {
  id: string;
  active: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor() {}
  private modals: IModal[] = [];

  registerModal(id: string) {
    this.modals.push({
      id: id,
      active: false,
    });
  }

  unRegisterModal(id: string) {
    this.modals.filter((element) => element.id !== id);
  }

  toggleModal(modalId: string) {
    const modal = this.modals.find((element) => element.id === modalId);
  }
  if(modal: IModal) {
    modal.active = !modal.active;
  }
}
