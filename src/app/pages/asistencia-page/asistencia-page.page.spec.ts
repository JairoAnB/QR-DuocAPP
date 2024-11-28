import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AsistenciaPagePage } from './asistencia-page.page';

describe('AsistenciaPagePage', () => {
  let component: AsistenciaPagePage;
  let fixture: ComponentFixture<AsistenciaPagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AsistenciaPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
