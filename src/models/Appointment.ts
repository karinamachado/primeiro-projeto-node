import { uuid } from 'uuidv4';

class Appointment{
    id : string;
    provider : string;
    date : Date;

    //O construtor é um método especial para criar e inicializar um objeto criado a partir de uma classe.

    constructor(provider:string, date: Date){
        this.id = uuid();
        this.provider = provider;
        this.date = date;

    }


}

export default Appointment;