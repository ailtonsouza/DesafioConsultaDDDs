import React, { useCallback, useRef } from 'react';
import { FiArrowLeft, FiMail, FiLock, FiUser } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { Form } from '@unform/web';

import semiTruck from '../../assets/semiTruck.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Content } from './styles';
import getValidationErros from '../../utils/getValidationErros';

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (data: object) => {
    try {
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatorio'),
        email: Yup.string()
          .required('E-mail obrigatorio')
          .email('Digite um e-mail válido'),
        password: Yup.string().min(6, 'No mínimo 6 digitos'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });
    } catch (err) {
      const errors = getValidationErros(err);
      formRef.current?.setErrors(errors);
    }
  }, []);

  return (
    <Content>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Faça seu cadastrado</h1>
        <Input name="name" icon={FiUser} placeholder=" User" />
        <Input name="email" icon={FiMail} placeholder="E-mail" />
        <Input
          name="password"
          icon={FiLock}
          type="password"
          placeholder="Senha"
        />
        <Button type="submit">Cadastrar</Button>
      </Form>
      <Link to="/">
        <FiArrowLeft />
        Pagina de login
      </Link>
    </Content>
  );
};

export default SignUp;
