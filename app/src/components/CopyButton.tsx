import React from 'react';
import Button from 'react-bootstrap/Button';
import { OfficialInformation, emailStringFromArray } from '../App';

type CopyButtonProps = {
  emailString: string;
  officials: OfficialInformation[];
};

export default function CopyButton(props: CopyButtonProps) {
  function handleClick() {
    let stringToCopy: string = '';
    if (props.emailString.length > 0) {
      stringToCopy = props.emailString;
    } else {
      props.officials.forEach((official: OfficialInformation) => {
        stringToCopy += emailStringFromArray(official.emails) + ', ';
      });
    }
    navigator.clipboard.writeText(stringToCopy);
  }
  return (
    <Button variant="success" block onClick={handleClick}>
      {props.emailString.length > 0 ? 'Copy Selected' : 'Copy All'}
    </Button>
  );
}
