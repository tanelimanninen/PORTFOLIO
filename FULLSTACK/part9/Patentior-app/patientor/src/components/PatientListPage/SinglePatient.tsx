import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Patient, Entry, Diagnosis, HealthCheckEntry, HealthCheckRating } from '../../types';

import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import WorkIcon from '@mui/icons-material/Work';
import Tooltip from '@mui/material/Tooltip';
import FavoriteIcon from '@mui/icons-material/Favorite';

import EntryDetails from './EntryDetails';

import patientService from '../../services/patients';
import diagnoseService from '../../services/diagnoses';


const SinglePatient = () => {
    const { id } = useParams();
    const [patient, setPatient] = useState<Patient | null>(null);
    const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

    useEffect(() => {
        const fetchPatientDetails = async () => {
          try {
            const fetchedPatient = await patientService.getById(id);
            setPatient(fetchedPatient);
          } catch (error) {
            console.error("Error fetching patient with given id", error);
          }
        };

        const fetchDiagnoses = async () => {
          try {
            const fetchedDiagnoses = await diagnoseService.getAll();
            setDiagnoses(fetchedDiagnoses);
          } catch (error) {
            console.error('Error fetching diagnoses', error);
          }
        };
    
    
        fetchPatientDetails();
        fetchDiagnoses();
    }, [id]);
    
    if (!patient || !diagnoses.length) {
      return <div>Loading...</div>;
    }

    const genderIcon = () => {
      if (patient.gender === 'male') {
          return <MaleIcon />;
      }
      else if (patient.gender === 'female') {
          return <FemaleIcon />;
      }
      else {
          return <QuestionMarkIcon />;
      }
    };

    const entryTypeIcon = (entries: Entry[]) => {
      return entries.map(entry => {
        let icon;
        let tooltipText;
    
        switch (entry.type) {
          case 'Hospital':
            icon = <LocalHospitalIcon />;
            tooltipText = 'Hospital Entry';
            break;
          case 'HealthCheck':
            icon = <MonitorHeartIcon />;
            tooltipText = 'Health Check Entry';
            break;
          case 'OccupationalHealthcare':
            icon = <WorkIcon />;
            tooltipText = 'Occupational Healthcare Entry';
            break;
          default:
            icon = null;
            tooltipText = 'Unknown Entry';
        }
    
        return (
          <Tooltip key={entry.id} title={tooltipText} arrow>
            {icon}
          </Tooltip>
        );
      });
    };

    const getDiagnosisName = (code: string) => {
      const diagnosis = diagnoses.find(d => d.code === code);
      
      return diagnosis ? diagnosis.name : 'Unknown';
    };

    const getHealthCheckIconColor = (entry: Entry): { color: string | null; tooltipText: string | null } => {
      if (entry.type === 'HealthCheck') {
        const healthCheckEntry = entry as HealthCheckEntry;
        if (healthCheckEntry.healthCheckRating !== undefined) {
        switch (healthCheckEntry.healthCheckRating) {
          case HealthCheckRating.Healthy:
            return { color: 'green', tooltipText: 'Healthy' };
          case HealthCheckRating.LowRisk:
            return { color: 'yellow', tooltipText: 'Low Risk' };
          case HealthCheckRating.HighRisk:
            return { color: 'orange', tooltipText: 'High Risk' };
          case HealthCheckRating.CriticalRisk:
            return { color: 'red', tooltipText: 'Critical Risk' };
          default:
            return { color: null, tooltipText: null };
        }
      }
    }
      return { color: null, tooltipText: null };
    };

    return (
        <div>
            <h2>{patient.name} {genderIcon()}</h2>

            <p><b>SSN:</b> {patient.ssn}</p>
            <p><b>Occupation:</b> {patient.occupation}</p>

            <h2>Entries</h2>
            
            {patient.entries.map((entry: Entry) => (
              <div key={entry.id} id='entry'>
                <p>{entryTypeIcon([entry])} {entry.date}</p>
                <p>{entry.description}</p>
                
                {entry.type === 'HealthCheck' && (
                  <Tooltip title={getHealthCheckIconColor(entry).tooltipText || ''} arrow>
                    <FavoriteIcon style={{ color: getHealthCheckIconColor(entry).color || 'transparent' }} />
                  </Tooltip>
                )}
  
                {entry.diagnosisCodes?.map(code => (
                  <ul>
                    <li>{code} - - {getDiagnosisName(code)}</li>
                  </ul>
                ))}

                <EntryDetails entry={entry} />
              </div>
            ))}
        </div>
    );
};

export default SinglePatient;