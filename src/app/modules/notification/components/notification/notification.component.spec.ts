import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MaterialModule } from 'app/modules/material/material.module';
import { configureTestSuite } from 'ng-bullet';
import { NotificationComponent } from './notification.component';
import { NotificationType } from '../../models/notification-type.enum';
import { Notification } from '../../models/notification.model';
import { NotificationIcon } from '../../models/notification-icon.enum';


describe('AppNotifComponent', () => {
  let component: NotificationComponent;
  let fixture: ComponentFixture<NotificationComponent>;
  const notif = new Notification('Notif message test', NotificationType.INFO);

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule
      ],
      declarations: [NotificationComponent]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationComponent);
    component = fixture.componentInstance;

    component.notification = notif;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display notif message', () => {
    expect(fixture.debugElement.query(By.css('.notif-message')).nativeElement.textContent).toContain(notif.message);
  });

  it('should display icon if and icon is provided in the notif model', fakeAsync(() => {
    component.notification = new Notification('Success notif', NotificationType.SUCCESS, NotificationIcon.CREATE);
    fixture.detectChanges();
    tick();
    expect(fixture.debugElement.query(By.css('.notif-icon'))).toBeDefined();
  }));
});
