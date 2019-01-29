import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { DialogsService } from './dialog.service';

@Injectable({
  providedIn: 'root'
})
export class AppUpdateService {

  constructor(private readonly updates: SwUpdate, private _dialogService: DialogsService) {
    this.updates.available.subscribe(event => {
      this.showAppUpdateAlert();
    });
  }

  showAppUpdateAlert() {
    this._dialogService.confirm('Une mise à jour est disponible', 'Voulez-vous lancer la mise à jour ?').subscribe(accepted => {
      if (accepted) {
        this.doAppUpdate();
      }
    });
  }

  doAppUpdate() {
    this.updates.activateUpdate().then(() => document.location.reload());
  }
}
