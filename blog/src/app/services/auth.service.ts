import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorLogin } from '../models/Author/AuthorLogin';
import { AuthorLoginResponse } from '../models/Author/AuthorLoginResponse';
import { AuthorService } from './author.service';


@Injectable({
    providedIn: 'root'
})
export class AuthService {

    public storage;
    _authorId: string = '';
    _userName: string = '';
    _isAuthenticated: boolean = false;
    _token: string;

    constructor(private router: Router,
        private authorService: AuthorService) {
        this.storage = localStorage;
    }

    b64DecodeUnicode(str: string) {
        return decodeURIComponent(atob(str).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    }

    getHeaders(): HttpHeaders {
        let headers = new HttpHeaders();
        headers = headers.set("Content-Type", 'application/json; charset=utf-8');

        if (this.isAuthenticated) {
            headers = headers.set("Authorization", "Bearer " + this.token);
        }
        return headers;
    }

    login(authRequest: AuthorLogin) {
        this.authorService.login(authRequest).subscribe((res) => {
            this.saveAuthResult(res);
            if (res.token) {
                this._isAuthenticated = true;
                this._userName = res.name;
                this._authorId = res.id;
                this._token = res.token;
            }
            this.router.navigate(['/']);
            console.log(this.storage)
        })
    }

    saveAuthResult(authResult: AuthorLoginResponse) {
        this.storage.setItem('authorId', authResult.id)
        this.storage.setItem('name', authResult.name)
        this.storage.setItem('email', authResult.email)
        this.storage.setItem('token', authResult.token)
    }

    logout() {
        this.storage.clear()
        this._authorId = '';
        this._userName = '';
        this._isAuthenticated = false;
        this.router.navigate(['/']);
        console.log(this.storage)
    }

    get isAuthenticated(): boolean {
        return this._isAuthenticated;
    }

    get userName() {
        return this._userName;
    }

    get userId() {
        return this._authorId;
    }

    get token() {
        return this._token;
    }
}