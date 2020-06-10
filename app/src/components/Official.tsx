import React from 'react';
import {
  OfficialInformation,
  OfficialCallback,
  emailStringFromArray,
} from '../App';
import Form from 'react-bootstrap/Form';

type OfficialProps = {
  official: OfficialInformation;
  handleClick: OfficialCallback;
};

export default function Official(props: OfficialProps) {
  function officialString(official: OfficialInformation) {
    const emails: string = emailStringFromArray(official.emails);
    return (
      <span>
        {official.name} ({official.office}):{' '}
        <a href={'mailto:' + emails}>{emails}</a>
      </span>
    );
  }
  function handleClick() {
    props.handleClick(props.official);
  }
  return (
    <Form.Check
      type="checkbox"
      label={officialString(props.official)}
      className="mb-1"
      onClick={handleClick}
    />
  );
}
