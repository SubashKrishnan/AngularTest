import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AppService } from './AppService';
import { AppModel, AppLeadModel } from './AppModel';

@Injectable()
export class AppBusiness {
    constructor(private service: AppService) { }

    GetSubscribedSellers(): Observable<AppModel[]> {
        return this.service.get<any>(`SendLead/GetSubscribedSellers`);
    }

    UpdateSubscribedSellers(Data: AppLeadModel): Observable<string> {
        return this.service.post<any>('SendLead/UpdateSubscribedSellers', Data);
    }
}
