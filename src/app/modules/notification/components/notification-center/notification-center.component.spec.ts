import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { configureTestSuite } from 'ng-bullet';
import { NotificationCenterComponent } from './notification-center.component';
import { NotificationService } from '../../services/notification.service';
import { Notification } from '../../models/notification.model';


describe('AppNotifCenterComponent', () => {
  let component: NotificationCenterComponent;
  let fixture: ComponentFixture<NotificationCenterComponent>;
  let notifService: NotificationService;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      imports: [
        MatIconModule,
        NoopAnimationsModule
      ],
      declarations: [NotificationCenterComponent],
      providers: [NotificationService]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationCenterComponent);
    component = fixture.componentInstance;
    component.defaultLifeTime = 100;
    fixture.detectChanges();
    notifService = TestBed.get(NotificationService);
    notifService.success('test');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display notifications provided by AppNotifActions', () => {
    expect(fixture.debugElement.queryAll(By.css('app-app-notif')).length).toBe(1);
  });

  it('should remove notification after lifeTimeOver', (done: any) => {
    spyOn(component, 'removeNotification');
    setTimeout(() => {
      fixture.detectChanges();
      expect(component.removeNotification).toHaveBeenCalled();
      done();
    }, 200);
  });
});
