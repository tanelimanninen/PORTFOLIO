import React from 'react';
import { Entry, HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry } from '../../types';

interface EntryDetailsProps {
  entry: Entry;
}

const EntryDetails: React.FC<EntryDetailsProps> = ({ entry }) => {
  switch (entry.type) {
    case 'HealthCheck':
      return <HealthCheckDetails entry={entry as HealthCheckEntry} />;
    case 'Hospital':
      return <HospitalDetails entry={entry as HospitalEntry} />;
    case 'OccupationalHealthcare':
      return <OccupationalHealthcareDetails entry={entry as OccupationalHealthcareEntry} />;
    default:
      return null;
  }
};

const HealthCheckDetails: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => (
  <div>
    <p>Specialist: {entry.specialist}</p>
  </div>
);

const HospitalDetails: React.FC<{ entry: HospitalEntry }> = ({ entry }) => (
  <div>
    <p>Specialist: {entry.specialist}</p>
    <p>Discharge Date: {entry.discharge.date}</p>
    <p>Discharge Criteria: {entry.discharge.criteria}</p>
  </div>
);

const OccupationalHealthcareDetails: React.FC<{ entry: OccupationalHealthcareEntry }> = ({ entry }) => (
  <div>
    <p>Specialist: {entry.specialist}</p>
    <p>Employer: {entry.employerName}</p>
    {entry.sickLeave && (
      <div>
        <p>Sick Leave Start Date: {entry.sickLeave.startDate}</p>
        <p>Sick Leave End Date: {entry.sickLeave.endDate}</p>
      </div>
    )}
  </div>
);

export default EntryDetails;
