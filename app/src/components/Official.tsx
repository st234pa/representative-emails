import React from 'react';
import { OfficialInformation, OfficialCallback } from '../App';
import Form from 'react-bootstrap/Form';

type OfficialProps = {
  official: OfficialInformation;
  handleClick: OfficialCallback;
};

export default function Official(props: OfficialProps) {
  function emailString(emails: string[]) {
    let emailString = '';
    for (let i in emails) {
      emailString += emails[i] + ', ';
    }
    emailString = emailString.substring(0, emailString.length - 2);
    return emailString;
  }
  function officialString(official: OfficialInformation) {
    const emails: string = emailString(official.emails);
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
      onChange={handleClick}
      key={props.official.name}
      checked={props.official.checked}
    />
  );
}
