interface LoginParams {
    username: string;
    password: string;
  }

export const authProvider = {
    async login({ username, password }: LoginParams)  {


        const request = new Request('/api/auth/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: new Headers({ 'Content-Type': 'application/json' }),
        });
        let response;
        try {
            response = await fetch(request);
        } catch (_error) {
            throw new Error('Network error');
        }
        if (response.status < 200 || response.status >= 300) {
            throw new Error(response.statusText);
        }
        const auth = await response.json();
        localStorage.setItem('auth', JSON.stringify(auth));
    },
    async checkError(error:any) {
        const status = error.status;
        if (status === 401 || status === 403) {
            localStorage.removeItem('auth');
            throw new Error();
        }
        // other error code (404, 500, etc): no need to log out
    },
    async checkAuth() {
        if (!localStorage.getItem('auth')) {
            const error = new Error();
            throw error;
        }
    },
    async logout() {
        localStorage.removeItem('auth');
        return '/';
    },
};
