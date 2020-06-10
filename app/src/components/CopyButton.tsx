import React from 'react';
import Button from 'react-bootstrap/Button';
import { EmptyCallback } from '../App';

type CopyButtonProps = {
  emailString: string;
  copyAll: boolean;
};

export default function CopyButton(props: CopyButtonProps) {
  function handleCopy() {
    navigator.clipboard.writeText(props.emailString);
  }
  return (
    <Button variant="success" block onClick={handleCopy}>
      {props.copyAll ? 'Copy All' : 'Copy Selected'}
    </Button>
  );
}
