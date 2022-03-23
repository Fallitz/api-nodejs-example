const fetch = require('cross-fetch');

describe('Users', () => {
    test('Not Get User Without Token', async () => {  
        const response = await fetch('http://localhost:3333/api/v1/users/getUser/', {
            method: 'GET'
        });

        const responseBody = await response.json();

        expect(response.status).toBe(401);
        expect(responseBody.auth).toBe(false);
        expect(responseBody.message).toBe('Nenhum token fornecido.');
    });
    test('Not Get User With Token Expired', async () => {
        const response = await fetch('http://localhost:3333/api/v1/users/getUser/', {
            method: 'GET',
            headers: {
                'access-token': "TESTETOKENERRADO"
            }
        });

        const responseBody = await response.json();
        
        expect(response.status).toBe(401);
        expect(responseBody.auth).toBe(false);
        expect(responseBody.message).toBe('Falha ao autenticar token.');
    });
});
