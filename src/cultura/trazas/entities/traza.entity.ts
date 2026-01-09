export class TrazaEntity {
    user:Object //nombre y rol PersonAuth
    collection:string //a donde se accedio
    operation:string //que se hizo
    error?:Object // error
    filter?: Object //HTTP Request
    before?: Object //status antes
    update?:Object //despues   
    
}



