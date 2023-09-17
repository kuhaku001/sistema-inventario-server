const verificarToken = require('../src/controller/autentificarToken');
var assert = require('assert');

describe('Prueba de validacion de Token', () => {
    
    it('001 - Ingreso de token valido', () => {
        return Token = verificarToken(
            {
                headers : {
                    authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDhkZDgxOGYwODFlOGViYzljNGZkMWIiLCJpYXQiOjE2ODg3NTA0NjN9.ZQRS0dLsZ3GCsdXVS6uoSAEeYRkLDeIyLfNnwKfsEGk'
                }
            }
        ).then((resultado) => {
            assert.equal(resultado, true);
        });
    });
        
    it('002 - Ingreso de token No Valido', () => {
        return Token = verificarToken(
            {
                headers : {
                    authorization: 'Bearer esdhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDhkZDgxOGYwODFlOGViYzljNGZkMWIiLCJpYXQiOjE2ODg3NTA0NjN9.ZQRS0dLsZ3GCsdXVS6uoSAEeYRkLDeIyLfNnwKfsEGk'

                }
            }
        ).then(resultado =>{
            assert.equal(resultado, false);
          });
    });
    
    it("003 - Ingreso de token, authorization modificado", () => {
        return Token = verificarToken(
            {
                headers : {
                    authorization: 'Bearer 648dd8c cxvxcv'
                }
            }
        ).then(resultado =>{
            assert.equal(resultado, false);
          });
    });

    it("004 - Ingreso de token, authorization sin ' '", () => {
        return Token = verificarToken(
            {
                headers : {
                    authorization: 'Bearer'
                }
            }
        ).then(resultado =>{
            assert.equal(resultado, false);
          });
    });

    it('005 - Ingreso de token, No authorization', () => {
        return Token = verificarToken(
            {
                headers :  'Bearer'
            }
        ).then(resultado =>{
            assert.equal(resultado, false);
          });
    });

    it('006 - Ingreso de vacío', () => {
        return Token = verificarToken(
            {}
        ).then(resultado =>{
            assert.equal(resultado, false);
          });
    });
    
    it('007 - Ingreso de float', () => {
        return Token = verificarToken(
            1212.32323
        ).then(resultado =>{
            assert.equal(resultado, false);
          });
    });

    it('008 - Ingreso de null', () => {
        return Token = verificarToken(
            null
        ).then(resultado =>{
            assert.equal(resultado, false);
          });
    });

    it('009 - Ingreso de undefined', () => {
        return Token = verificarToken(
            undefined
        ).then(resultado =>{
            assert.equal(resultado, false);
          });
    });

    it('010 - Ingreso de number', () => {
        return Token = verificarToken(
            123213123
        ).then(resultado =>{
            assert.equal(resultado, false);
          });
    });

    it('011 - Ingreso de string', () => {
        return Token = verificarToken(
            "sadasd"
        ).then(resultado =>{
            assert.equal(resultado, false);
          });
    });

    it('012 - Ingreso de lista', () => {
        return Token = verificarToken(
            []
        ).then(resultado =>{
            assert.equal(resultado, false);
          });
    });

    it('013 - Ingreso de token No valido, boolean', () => {
        return Token = verificarToken(
            {
                headers : {
                    authorization: true
                }
            }
        ).then(resultado =>{
            assert.equal(resultado, false);
          });
    });

    it('014 - Ingreso de token  no valido, number', () => {
        return Token = verificarToken(
            {
                headers : {
                    authorization: 2323
                }
            }
        ).then(resultado =>{
            assert.equal(resultado, false);
          });
    });

    it('015 - Ingreso de token NO valido, float', () => {
        return Token = verificarToken(
            {
                headers : {
                    authorization: 31.32
                }
            }
        ).then(resultado =>{
            assert.equal(resultado, false);
          });
    });

    it('016 - Ingreso de token NO valido, null', () => {
        return Token = verificarToken(
            {
                headers : {
                    authorization: null
                }
            }
        ).then(resultado =>{
            assert.equal(resultado, false);
          });
    });

    it('017 - Ingreso de token NO valido, undefined', () => {
        return Token = verificarToken(
            {
                headers : {
                    authorization: undefined
                }
            }
        ).then(resultado =>{
            assert.equal(resultado, false);
          });
    });
});
