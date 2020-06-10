import React from 'react';
import Form from 'react-bootstrap/Form';
import { OfficialInformation, OfficialCallback } from '../App';
import Official from './Official';
type OfficialsListProps = {
  officials: OfficialInformation[];
  handleClick: OfficialCallback;
};

export default function OfficialsList(props: OfficialsListProps) {
  return (
    <Form>
      {props.officials.map((official: OfficialInformation) =>
        Official({ official: official, handleClick: props.handleClick })
      )}
    </Form>
  );
}
