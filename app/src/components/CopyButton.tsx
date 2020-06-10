import React from 'react';
import Button from 'react-bootstrap/Button';
import { EmptyCallback } from '../App';

type CopyButtonProps = {
  emailString: string;
  copyAll: boolean;
  handleClick: EmptyCallback;
};

export default function CopyButton(props: CopyButtonProps) {
  function handleClick() {
    navigator.clipboard.writeText(props.emailString);
  }
  return (
    <Button variant="success" block onClick={props.handleClick}>
      {props.copyAll ? 'Copy All' : 'Copy Selected'}
    </Button>
  );
}
