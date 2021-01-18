import { AuthInterceptor } from "./auth.interceptor";

export class HttpAuthToken extends AuthInterceptor {

    protected getToken(): string {
        return 'token-1';
    }

    protected saveToken(token: string): string {
        return 'token-save';
    }

    protected refreshToken(): string {
        return 'token-2';
    }
}