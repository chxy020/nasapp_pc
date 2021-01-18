
import {throwError as observableThrowError,  Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';


export const handleError = (error: HttpResponse<any> | any) => {
    console.error('HttpService Error : ', error);
    return observableThrowError(error);
};