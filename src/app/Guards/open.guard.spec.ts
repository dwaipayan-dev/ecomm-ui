import { TestBed } from '@angular/core/testing';

import { OpenGuard } from './open.guard';

describe('OpenGuard', () => {
  let guard: OpenGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(OpenGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
