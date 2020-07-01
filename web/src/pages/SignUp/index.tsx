import React from 'react';
import {
  FiArrowLeft, FiMail, FiUser, FiLock,
} from 'react-icons/fi';
import logoImg from '../../assets/logo.svg';
import { Container, Background, Content } from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';

const SignUp: React.FC = () => (
  <Container>
    <Background />
    <Content>
      <img src={logoImg} alt="GoBarber" />

      <form>
        <h1>Faça seu cadastro</h1>
        <Input icon={FiUser} name="name" placeholder="name" />
        <Input icon={FiMail} name="email" placeholder="E-mail" />
        <Input icon={FiLock} name="password" type="password" placeholder="Senha" />
        <Button type="submit"> Cadastrar</Button>
      </form>
      <a href="login">
        <FiArrowLeft />
        Voltar para logon
      </a>
    </Content>

  </Container>
);

export default SignUp;
