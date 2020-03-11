import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class FileManagerService implements Resolve<any>
{
    onFilesChanged: BehaviorSubject<any>;
    onFileSelected: BehaviorSubject<any>;
    private apiURL = environment.webapiURL;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private _httpClient: HttpClient
    ) {
        // Set the defaults
        this.onFilesChanged = new BehaviorSubject({});
        this.onFileSelected = new BehaviorSubject({});
    }

    /**
     * Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        return new Promise((resolve, reject) => {

            Promise.all([
                this.getFiles(),
                // this.getItems()
            ]).then(
                ([files]) => {
                    resolve();
                },
                reject
            );
        });
    }

    /**
     * Get files
     *
     * @returns {Promise<any>}
     */
    getFiles(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get('api/file-manager')
                .subscribe((response: any) => {
                    this.onFilesChanged.next(response);
                    this.onFileSelected.next(response[0]);
                    resolve(response);
                }, reject);
        });
    }

    getItems(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get(this.apiURL + '/item/2')
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

}
