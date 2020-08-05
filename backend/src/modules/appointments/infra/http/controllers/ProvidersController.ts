import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListProvidersService from '@modules/appointments/services/ListProvidersService';
import { classToClass } from 'class-transformer';

export default class ProvidersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const createAppointment = container.resolve(ListProvidersService);
    const appointment = await createAppointment.execute({
      user_id,
    });
    return response.json(classToClass(appointment));
  }
}
