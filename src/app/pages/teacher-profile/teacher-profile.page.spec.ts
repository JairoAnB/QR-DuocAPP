import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TeacherProfilePage } from './teacher-profile.page';

describe('TeacherProfilePage', () => {
  let component: TeacherProfilePage;
  let fixture: ComponentFixture<TeacherProfilePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
