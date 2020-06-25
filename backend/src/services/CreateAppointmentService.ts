import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import Appointment from '../models/Appointment';
import AppoitmentsRepository from '../repositories/AppointmentsRepository';

interface Request {
  provider: string;
  date: Date;
}

class CreateAppointmentService {
  public async execute({ date, provider }: Request): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppoitmentsRepository);
    const appoitmentDate = startOfHour(date);

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(
      appoitmentDate,
    );

    if (findAppointmentInSameDate) {
      throw Error('This appointment is already booked');
    }
    const appointment = appointmentsRepository.create({
      date: appoitmentDate,
      provider,
    });

    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
