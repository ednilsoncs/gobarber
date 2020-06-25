import { Router, Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { parseISO } from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppoitmentService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();

appointmentsRouter.get('/', async (request: Request, response: Response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointments = await appointmentsRepository.find();

  return response.json(appointments);
});

appointmentsRouter.post('/', async (request: Request, response: Response) => {
  try {
    const { provider, date } = request.body;
    const parsedDate = parseISO(date);
    const createAppointment = new CreateAppoitmentService();
    const appointment = await createAppointment.execute({
      date: parsedDate,
      provider,
    });
    return response.json(appointment);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default appointmentsRouter;
