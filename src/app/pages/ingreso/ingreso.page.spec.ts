import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IngresoPage } from './ingreso.page';

describe('IngresoPage', () => {
  let component: IngresoPage;
  let fixture: ComponentFixture<IngresoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(IngresoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
