import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './BaseService';

@Injectable()
export class AppService extends BaseService {
    constructor(private service: HttpClient) {
        super(service);
    }
}
