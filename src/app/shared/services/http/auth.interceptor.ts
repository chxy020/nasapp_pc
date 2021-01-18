
import {tap} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpResponse,
    HttpEvent,
    HttpInterceptor,
    HttpHandler
} from "@angular/common/http";
import { Observable } from "rxjs";


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const token = 'token-1';
        const authReq = req.clone({
            setHeaders: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'Authorization': `ty-token ${token}`
            }
        });

        // return next.handle(authReq);
        return next.handle(authReq).pipe(tap(event => {

            if (event instanceof HttpResponse) {
                if (event.status == 401) {
                    const reqUrl: string = authReq.url;
                    const url: string = reqUrl.indexOf("http") == 0 ?
                        reqUrl.split("/").slice(0, 4).join("/") :
                        reqUrl.split("/").slice(0, 2).join("/");

                    let localHref = window.location.href;
                    let hashUrl = '';
                    let hashOption = '';
                    let currentUrlArr = localHref.split("#");
                    if (currentUrlArr.length > 1) {
                        hashUrl = currentUrlArr[0];
                        hashOption = currentUrlArr[1];
                    }
                    hashOption = encodeURIComponent(hashOption);
                    let newUrl = `${url}/fr?frUrl=${hashUrl}&hash=${hashOption}`;

                    window.location.href=newUrl;
                }
            }
        }));
    }


}
