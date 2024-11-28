import { TestBed } from '@angular/core/testing';
import { AuthenticatorGuardGuard } from './authenticator-guard.guard'; 
import { NavController } from '@ionic/angular';

describe('AuthenticatorGuardGuard', () => {
  let guard: AuthenticatorGuardGuard;
  let navCtrlSpy: jasmine.SpyObj<NavController>;

  beforeEach(() => {
    navCtrlSpy = jasmine.createSpyObj('NavController', ['navigateRoot']);

    TestBed.configureTestingModule({
      providers: [
        AuthenticatorGuardGuard,
        { provide: NavController, useValue: navCtrlSpy } 
      ]
    });


    guard = TestBed.inject(AuthenticatorGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow activation if user is found in localStorage', () => {
    spyOn(localStorage, 'getItem').and.returnValue('true');
    const result = guard.canActivate(null as any, null as any);
    expect(result).toBeTrue();
  });

  it('should prevent activation and redirect if user is not found', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    const result = guard.canActivate(null as any, null as any);
    expect(result).toBeFalse();
    expect(navCtrlSpy.navigateRoot).toHaveBeenCalledWith('home');
  });
});
