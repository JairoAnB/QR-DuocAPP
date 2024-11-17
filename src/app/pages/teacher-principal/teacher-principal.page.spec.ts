import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TeacherPrincipalPage } from './teacher-principal.page';

describe('TeacherPrincipalPage', () => {
  let component: TeacherPrincipalPage;
  let fixture: ComponentFixture<TeacherPrincipalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherPrincipalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
