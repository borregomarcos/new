/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EmergencyContactService } from './emergency-contact.service';

describe('Service: EmergencyContact', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmergencyContactService]
    });
  });

  it('should ...', inject([EmergencyContactService], (service: EmergencyContactService) => {
    expect(service).toBeTruthy();
  }));
});
