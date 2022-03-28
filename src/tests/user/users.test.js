const fetch = require('cross-fetch');

describe('Users', () => {
    test('Not create account with email address registered', async () => {
        const response = await fetch('http://localhost:3333/api/v1/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
               
                email: "aluno@gmail.com",
                password: "0123456789",
                fullname: "Nome Aluno UM",
                birth: "01/01/2000",
                phone:"(79)99999-9999",
                nickname: "aluno",
                gender: "Masculino",
                type: "Aluno",           
            }),
            
        });
        
        const responseBody = await response.json();
        
        expect(response.status).toBe(403);
        expect(responseBody.status).toBe(false);
        expect(responseBody.message).toBe('Email já registrado');
    });
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
