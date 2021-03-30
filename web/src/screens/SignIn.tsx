import { useFormik } from 'formik';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signIn } from '../actions/authentication';
import { AuthenticationBar } from '../components/AuthenticationBar';
import { Button } from '../components/Button';
import { Form } from '../components/Form';
import { TextInput } from '../components/TextInput';
import { StateType } from '../reducers';

export const SignIn: React.FC = () => {
  const loading = useSelector((state: StateType) => state.loading);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: values => {
      dispatch(signIn(values.username, values.password));
    },
  });

  return (
    <>
      <AuthenticationBar isSignIn={true} />
      <Form onSubmit={formik.handleSubmit}>
        <TextInput
          label="Username"
          name="username"
          onChange={formik.handleChange}
          value={formik.values.username}
        />
        <TextInput
          label="Password"
          type="password"
          name="password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        <Button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Sign in'}
        </Button>
      </Form>
    </>
  );
};
