import { FormikErrors, useFormik } from 'formik';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { signUp } from '../actions/authentication';
import { AuthenticationBar } from '../components/AuthenticationBar';
import { Form } from '../components/Form';
import { Button } from '../components/Button';
import { TextInput } from '../components/TextInput';
import { StateType } from '../reducers';

function hasNumber(str: string) {
  return /\d/.test(str);
}

function hasLetter(str: string) {
  return /[A-Za-z]/.test(str);
}

function validateNotEmpty(str: string) {
  if (!str) {
    return 'Field must not be empty.';
  }
}

function validateEmail(str: string) {
  if (!/\S+@\S+\.\S+/.test(str)) {
    return 'Email must be valid.';
  }
}

function validatePassword(str: string) {
  if (!hasNumber(str)) {
    return 'Password must contain at least one number.';
  }

  if (!hasLetter(str)) {
    return 'Password must contain at least one letter.';
  }

  if (str.length < 8) {
    return 'Password must be at least 8 characters long.';
  }
}

function validateName(str: string) {
  if (str.length < 5) {
    return 'Full name must be longer than 5 characters.';
  }
}

export const SignUp: React.FC = () => {
  const loading = useSelector((state: StateType) => state.loading);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      fullName: '',
      password: '',
      confirmPassword: '',
    },
    validate: values => {
      const errors: FormikErrors<typeof values> = {};

      errors.username = validateNotEmpty(values.username);
      errors.fullName = validateName(values.fullName);
      errors.password = validatePassword(values.password);
      errors.email = validateEmail(values.email);
      errors.confirmPassword =
        values.password !== values.confirmPassword
          ? 'Password confirmation must match password.'
          : undefined;

      if (
        !errors.username &&
        !errors.fullName &&
        !errors.password &&
        !errors.email &&
        !errors.confirmPassword
      ) {
        return undefined;
      }

      return errors;
    },
    onSubmit: values => {
      console.log('submit?');
      dispatch(
        signUp(values.username, values.password, values.fullName, values.email)
      );
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
          error={formik.errors.username}
        />
        <TextInput
          label="Full name"
          name="fullName"
          onChange={formik.handleChange}
          value={formik.values.fullName}
          error={formik.errors.fullName}
        />
        <TextInput
          label="E-mail"
          name="email"
          onChange={formik.handleChange}
          value={formik.values.email}
          error={formik.errors.email}
        />
        <TextInput
          label="Password"
          type="password"
          name="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          error={formik.errors.password}
        />
        <TextInput
          label="Confirm password"
          type="password"
          name="confirmPassword"
          onChange={formik.handleChange}
          value={formik.values.confirmPassword}
          error={formik.errors.confirmPassword}
        />
        <Button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Sign up'}
        </Button>
      </Form>
    </>
  );
};
