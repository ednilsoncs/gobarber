interface IMailConfig {
  driver: 'ethereal' | 'ses';

  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVE || 'ethereal',

  defaults: {
    from: {
      email: 'ednilsonsantos@gmail.com',
      name: 'Ednilson Cardoso dos Santos',
    },
  },
} as IMailConfig;
