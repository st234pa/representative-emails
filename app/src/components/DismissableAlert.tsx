import React from 'react';
import Alert from 'react-bootstrap/Alert';
import { EmptyCallback } from '../App';

type DismissableAlertProps = {
  show: boolean;
  handleClose: EmptyCallback;
};

export default function DismissableAlert(props: DismissableAlertProps) {
  if (props.show) {
    return (
      <Alert variant="danger" onClose={props.handleClose} dismissible>
        <Alert.Heading>Oh snap!</Alert.Heading>
        <p>None of your representatives seem to be reachable by email.</p>
      </Alert>
    );
  } else {
    return;
  }
}
