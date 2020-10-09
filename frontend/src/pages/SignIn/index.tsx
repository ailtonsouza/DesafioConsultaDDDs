import React, { useCallback, useRef } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import { Content } from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';
import getValidationErros from '../../utils/getValidationErros';

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: object) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          email: Yup.string()
            .required('Email obrigatorio')
            .email('Digite um e-mail válido'),
          password: Yup.string().required('Senha obrigatoria'),
        });
        await schema.validate(data, {
          abortEarly: false,
        });
        history.push('/ViewTable');
      } catch (err) {
        const errors = getValidationErros(err);
        formRef.current?.setErrors(errors);
      }
    },
    [history],
  );

  return (
    <Content>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Faça seu login</h1>
        <Input name="email" icon={FiMail} placeholder="E-mail" />
        <Input
          name="password"
          icon={FiLock}
          type="password"
          placeholder="Senha"
        />
        <Button type="submit">Entrar</Button>
        <Link to="/signup">Esqueci minha senha</Link>
      </Form>
      <Link to="/signup">
        <FiLogIn />
        Criar conta
      </Link>
    </Content>
  );
};

export default SignIn;
