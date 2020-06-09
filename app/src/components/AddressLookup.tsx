import React from 'react';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { AddressLookupCallback } from '../App';
import Col from 'react-bootstrap/Col';

type AddressLookupProps = {
  handleSubmit: AddressLookupCallback;
  error: string;
};

export default function AddressLookup(props: AddressLookupProps) {
  const [input, setInput] = React.useState<string>('');

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setInput(evt.target.value);
  };

  return (
    <Form.Group>
      <Form.Row>
        <Col md={9} className="mb-2">
          <FormControl
            className={'input-group ' + (props.error && ' is-invalid')}
            placeholder="Type or paste an address"
            aria-label="Address"
            aria-describedby="basic-addon2"
            onChange={handleChange}
          ></FormControl>
          {props.error && (
            <Form.Control.Feedback type="invalid">
              {props.error}
            </Form.Control.Feedback>
          )}
        </Col>
        <Col md={3}>
          <Button
            block
            variant="primary"
            onClick={() => {
              props.handleSubmit(input);
            }}
          >
            Get Emails
          </Button>
        </Col>
      </Form.Row>
    </Form.Group>
  );
}
