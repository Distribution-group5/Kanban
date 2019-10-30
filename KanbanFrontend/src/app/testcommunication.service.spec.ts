import { TestBed } from '@angular/core/testing';

import { TestcommunicationService } from './testcommunication.service';

describe('TestcommunicationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TestcommunicationService = TestBed.get(TestcommunicationService);
    expect(service).toBeTruthy();
  });
});
