import ISendMailDto from '../dtos/ISendMailDTO';

export default interface IMailProvider {
  sendMail(data: ISendMailDto): Promise<void>;
}
