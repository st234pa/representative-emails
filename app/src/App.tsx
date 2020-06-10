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
import { isEqual } from 'lodash';

export type OfficialInformation = {
  name: string;
  office: string;
  emails: string[];
  checked: boolean;
};

export type AddressLookupCallback = {
  (address: string): void;
};

export type OfficialCallback = {
  (official: OfficialInformation): void;
};

export type EmptyCallback = {
  (): void;
};

export default function App() {
  const [apiError, setApiError] = React.useState<string>('');
  const [officials, setOfficials] = React.useState<OfficialInformation[]>([]);
  const [copyAll, setCopyAll] = React.useState<boolean>(true);
  const [showAlert, setShowAlert] = React.useState<boolean>(false);
  const [emailsToCopy, setEmailsToCopy] = React.useState<string>('');

  function sortByName(a: any, b: any) {
    const a_official = a as OfficialInformation;
    const b_official = b as OfficialInformation;
    return a_official.name.localeCompare(b_official.name);
  }

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
          const officesData: any[] = data['offices'];
          let officialsData: any[] = data['officials'];
          officesData.forEach((office: any) => {
            const officialIndices: number[] = office.officialIndices;
            officialIndices.forEach((officialIndex: number) => {
              officialsData[officialIndex].office = office.name;
            });
          });
          let results = officialsData
            .filter((result: any) => 'emails' in result)
            .map((result: any) => ({
              name: result['name'],
              emails: result['emails'],
              office: result['office'],
              checked: true,
            }));
          if (results.length === 0) {
            setShowAlert(true);
          } else {
            results = results.sort(sortByName);
            setOfficials(results);
          }
        }
      });
  }

  function handleDismissAlert() {
    setShowAlert(false);
  }

  function handleClick(official: OfficialInformation) {
    let newOfficials = new Set<OfficialInformation>(officials);
    officials.forEach((value: OfficialInformation) => {
      if (isEqual(official, value)) {
        newOfficials.delete(value);
        const newOfficial = {
          name: official.name,
          office: official.office,
          emails: official.emails,
          checked: !official.checked,
        };
        newOfficials.add(newOfficial);
      }
    });
    const newOfficialsArray = Array.from(newOfficials);
    const newCopyAll = newOfficialsArray.every(
      (official: OfficialInformation) => official.checked
    );
    setOfficials(newOfficialsArray.sort(sortByName));
    setCopyAll(newCopyAll);
    let emails = new Set<string>();
    let emailString: string = '';
    newOfficials.forEach((value: OfficialInformation) => {
      if (newCopyAll || value.checked) {
        value.emails.forEach(emails.add, emails);
      }
    });
    emails.forEach((email: string) => {
      emailString += email + ',';
    });
    setEmailsToCopy(emailString);
  }

  function handleCopy() {
    navigator.clipboard.writeText(emailsToCopy);
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
            <p className="mb-3 text-center">
              <small>&mdash; Stephanie Yoon</small>
            </p>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col lg={8}>
            <p className="text-center mb-3">
              <a
                href="https://syoon123.github.io/etemplate"
                target="_blank"
                rel="noopener noreferrer"
              >
                Need to make an email template?
              </a>
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
                emailString: emailsToCopy,
                copyAll: copyAll,
                handleClick: handleCopy,
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
