import { Injectable } from '@angular/core';

interface Modal {
  id: string;
  isActive: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  modals: Modal[] = [];

  registerModal(id: string) {
    this.modals.push({
      id: id,
      isActive: false,
    });
  }
  unregisterModal(id: string) {
    this.modals = this.modals.filter((m) => m.id !== id);
  }

  toggleModal(id: string) {
    const modal = this.modals.find((element) => element.id === id);

    if (modal) {
      modal.isActive = !modal.isActive;
    }
  }

  isModalOpen(id: string) {
    return !!this.modals.find((element) => element.id === id)?.isActive;
  }
}
