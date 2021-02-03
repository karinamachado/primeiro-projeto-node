// servico responsavel pela criacao do agendamento.
import { startOfHour } from 'date-fns';
import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository'; 

// Recebimento das informacoes
// Tratativa de errros e excecoes
// Acesso ao repositorio

//recebimento das informacoes. DTO
interface Request {
    date: Date;
    provider: string;
}

//Dependency Inversion (solid)- sempre que o service, tiver
//uma dependencia, no caso é o repository ao inves de instarciarmos uma classe
//dentro do service, nós vamos receber esse appoitment repository como paramentro da nossa classe.
// isso vai facilitar, independente de quantos services, o app tiver, todos os outros
// services, vão utilizar o mesmo appointment.


//recebendo as dependencias
class CreateAppointmentService{

    private appointmentsRepository : AppointmentsRepository;

    constructor(appointmentsRepository:AppointmentsRepository) {
        this.appointmentsRepository = appointmentsRepository;

    }

    public execute({date, provider}: Request): Appointment {
        const appointmentDate = startOfHour(date);

 const findAppointmentInSameDate = this.appointmentsRepository.findByDate(
    appointmentDate,
 );

 if(findAppointmentInSameDate){
     throw Error ('This appointment is already booked');
     
 }
 
 const appointment = this.appointmentsRepository.create({
     provider,
     date: appointmentDate,
 });
        return appointment;
    }
}

export default CreateAppointmentService;
