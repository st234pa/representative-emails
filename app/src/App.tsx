import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import AddressLookup from './components/AddressLookup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import OfficialsList from './components/OfficialsList';
import CopyButton from './components/CopyButton';
import DismissableAlert from './components/DismissableAlert';

export type OfficialInformation = {
  name: string;
  emails: string[];
};

export type AddressLookupCallback = {
  (address: string): void;
};

export type OfficialCallback = {
  (official: OfficialInformation): void;
};

export type DismissAlertCallback = {
  (): void;
};

export function emailStringFromArray(emails: string[]) {
  let emailString = '';
  for (let i in emails) {
    emailString += emails[i] + ', ';
  }
  emailString = emailString.substring(0, emailString.length - 2);
  return emailString;
}

export default function App() {
  const [apiError, setApiError] = React.useState<string>('');
  const [officials, setOfficials] = React.useState<OfficialInformation[]>([]);
  const [emailsToCopy, setEmailsToCopy] = React.useState<
    Map<OfficialInformation, boolean>
  >(new Map<OfficialInformation, boolean>());
  const [showAlert, setShowAlert] = React.useState<boolean>(false);

  function handleAddressLookup(address: string) {
    fetch(
      `https://www.googleapis.com/civicinfo/v2/representatives?address=${address}&key=AIzaSyDu5VBw2c0PyvyUGlUNEY7hsIQC55t4W_0`
    )
      .then((response) => response.json())
      .then((data) => {
        if ('error' in data) {
          setApiError(data['error']['message']);
        } else {
          setApiError('');
          const results = data['officials']
            .filter((result: any) => 'emails' in result)
            .map((result: any) => ({
              name: result['name'],
              emails: result['emails'],
            }));
          if (results.length === 0) {
            setShowAlert(true);
          } else {
            setOfficials(results);
          }
        }
      });
  }

  function handleDismissAlert() {
    setShowAlert(false);
  }

  function handleClick(official: OfficialInformation) {
    const isSelected = !emailsToCopy.get(official);
    let newEmailsToCopy = new Map<OfficialInformation, boolean>();
    emailsToCopy.forEach((value: boolean, key: OfficialInformation) => {
      newEmailsToCopy.set(key, value);
    });
    newEmailsToCopy.set(official, isSelected);
    setEmailsToCopy(newEmailsToCopy);
  }

  function emailStringFromMap() {
    let emailString: string = '';
    emailsToCopy.forEach((value: boolean, key: OfficialInformation) => {
      emailString += value ? emailStringFromArray(key.emails) + ', ' : '';
    });
    return emailString;
  }

  return (
    <div className="App">
      <Container>
        <Row className="mt-3 mb-0 justify-content-md-center">
          <Col lg={8}>
            <h1 className="text-center">Representative Emails</h1>
          </Col>
        </Row>
        <Row className="mt-0 mb-0 justify-content-md-center">
          <Col lg={8}>
            <p className="mb-0 text-center">
              A tool to find your representatives and get their emails!
            </p>
            <p className="mb-0 text-center">
              Built using the Google Civic Information API.
            </p>
            <p className="text-center">
              <small>&mdash; Stephanie Yoon</small>
            </p>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col lg={8}>
            {AddressLookup({
              handleSubmit: handleAddressLookup,
              handleDismissAlert: handleDismissAlert,
              error: apiError,
            })}
          </Col>
        </Row>
        <Row className="justify-content-md-center mb-3">
          <Col lg={8}>
            {DismissableAlert({
              show: showAlert,
              handleClose: handleDismissAlert,
            })}
          </Col>
        </Row>
        <Row className="justify-content-md-center mb-3">
          <Col lg={8}>
            {officials.length > 0 &&
              CopyButton({
                emailString: emailStringFromMap(),
                officials: officials,
              })}
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col lg={8}>
            {officials.length > 0 && (
              <h5 className="mb-3">
                We found {officials.length}{' '}
                {officials.length === 1 ? 'representative' : 'representatives'}{' '}
                you can email.
              </h5>
            )}
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col lg={8}>
            {officials.length > 0 &&
              OfficialsList({
                officials: officials,
                handleClick: handleClick,
              })}
          </Col>
        </Row>
      </Container>
    </div>
  );
}
