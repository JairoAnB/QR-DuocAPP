import { TestBed } from '@angular/core/testing';
import { noAuthenticatorGuardGuard } from './no-authenticator-guard.guard';
import { NavController } from '@ionic/angular';

describe('noAuthenticatorGuardGuard', () => {
  let guard: noAuthenticatorGuardGuard;
  let navCtrlSpy: jasmine.SpyObj<NavController>;

  beforeEach(() => {
    navCtrlSpy = jasmine.createSpyObj('NavController', ['navigateRoot']);

    TestBed.configureTestingModule({
      providers: [
        noAuthenticatorGuardGuard,
        { provide: NavController, useValue: navCtrlSpy }
      ]
    });

    guard = TestBed.inject(noAuthenticatorGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow activation if the user is not logged in', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    const result = guard.canActivate(null as any, null as any);
    expect(result).toBeTrue();
  });

  it('should prevent activation and redirect if the user is logged in', () => {
    spyOn(localStorage, 'getItem').and.returnValue('true');
    const result = guard.canActivate(null as any, null as any);
    expect(result).toBeFalse();
    expect(navCtrlSpy.navigateRoot).toHaveBeenCalledWith('inicio');
  });
});
