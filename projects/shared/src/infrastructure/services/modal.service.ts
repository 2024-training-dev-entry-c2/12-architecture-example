import { DOCUMENT } from '@angular/common';
import {
  ViewContainerRef,
  Inject,
  Injectable,
  Injector,
  TemplateRef,
  ComponentRef,
} from '@angular/core';
import { Subject } from 'rxjs';
import { ModalComponent } from '../ui/components/modal/modal.component';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private modalNotifier?: Subject<string>;
  private modalComponentRef?: ComponentRef<ModalComponent>;

  constructor(
    private injector: Injector,
    @Inject(DOCUMENT) private document: Document
  ) {}

  open(
    content: TemplateRef<any>,
    viewContainerRef: ViewContainerRef,
    options?: { title?: string; buttonName?: string }
  ) {
    const modalComponentRef = viewContainerRef.createComponent(ModalComponent);
    this.modalComponentRef = modalComponentRef;

    if (options?.title) {
      modalComponentRef.instance.title = options.title;
    }
    if (options?.title) {
      modalComponentRef.instance.buttonName = options.buttonName;
    }

    const contentViewRef = content.createEmbeddedView(null);
    modalComponentRef.instance.viewContainerRef.insert(contentViewRef);

    modalComponentRef.instance.closeEvent.subscribe(() => this.closeModal());
    modalComponentRef.instance.submitEvent.subscribe(() => this.submitModal());

    modalComponentRef.hostView.detectChanges();
    this.document.body.appendChild(modalComponentRef.location.nativeElement);

    this.modalNotifier = new Subject<string>();
    return this.modalNotifier.asObservable();
  }

  closeModal() {
    this.modalComponentRef?.destroy();
    this.modalNotifier?.complete();
  }

  submitModal() {
    this.modalNotifier?.next('confirm');
    this.closeModal();
  }
}
