import { TestBed } from '@angular/core/testing';

import { QrPdfService } from './qr-pdf.service';

describe('QrPdfService', () => {
  let service: QrPdfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QrPdfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
