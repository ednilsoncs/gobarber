import { startOfHour } from 'date-fns';
import Appointment from '../models/Appointment';
import AppoitmentsRepository from '../repositories/AppointmentsRepository';

interface Request {
  provider: string;
  date: Date;
}

class CreateAppointmentService {
  private appointmentsRepository: AppoitmentsRepository;

  constructor(appointmentsRepository: AppoitmentsRepository) {
    this.appointmentsRepository = appointmentsRepository;
  }

  public execute({ date, provider }: Request): Appointment {
    const appoitmentDate = startOfHour(date);

    const findAppointmentInSameDate = this.appointmentsRepository.findByDate(
      appoitmentDate,
    );

    if (findAppointmentInSameDate) {
      throw Error('This appointment is already booked');
    }
    const appointment = this.appointmentsRepository.create({
      date: appoitmentDate,
      provider,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
