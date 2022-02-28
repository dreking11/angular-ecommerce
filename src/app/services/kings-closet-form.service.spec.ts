import { TestBed } from '@angular/core/testing';

import { KingsClosetFormService } from './kings-closet-form.service';

describe('KingsClosetFormService', () => {
  let service: KingsClosetFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KingsClosetFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
