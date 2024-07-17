import { TestBed } from '@angular/core/testing';

import { QrCodeServiceService } from './qr-code-service.service';

describe('QrCodeServiceService', () => {
  let service: QrCodeServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QrCodeServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
