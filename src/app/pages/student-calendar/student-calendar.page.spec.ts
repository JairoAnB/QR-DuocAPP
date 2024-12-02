import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StudentCalendarPage } from './student-calendar.page';

describe('StudentCalendarPage', () => {
  let component: StudentCalendarPage;
  let fixture: ComponentFixture<StudentCalendarPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentCalendarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
