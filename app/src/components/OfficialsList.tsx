import React from 'react';
import { OfficialInformation, OfficialCallback } from '../App';
import Official from './Official';
type OfficialsListProps = {
  officials: OfficialInformation[];
  handleClick: OfficialCallback;
};

export default function OfficialsList(props: OfficialsListProps) {
  return (
    <ul>
      {props.officials.map((official: OfficialInformation) => (
        <li key={official.name}>
          {Official({ official: official, handleClick: props.handleClick })}
        </li>
      ))}
    </ul>
  );
}
