import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '../actions/authentication';
import { Button } from '../components/Button';
import { StateType } from '../reducers';

export const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const fullName = useSelector((state: StateType) => state.fullName);

  return (
    <div>
      <h2>Welcome {fullName}!</h2>
      <div>To logout click here.</div>
      <Button onClick={() => dispatch(signOut())}>Log out</Button>
    </div>
  );
};
