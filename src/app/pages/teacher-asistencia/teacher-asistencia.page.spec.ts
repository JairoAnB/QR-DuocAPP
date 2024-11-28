import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TeacherAsistenciaPage } from './teacher-asistencia.page';

describe('TeacherAsistenciaPage', () => {
  let component: TeacherAsistenciaPage;
  let fixture: ComponentFixture<TeacherAsistenciaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherAsistenciaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
