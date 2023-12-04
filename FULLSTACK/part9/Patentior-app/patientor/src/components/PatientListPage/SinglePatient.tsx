import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Patient, Entry, Diagnosis } from '../../types';

import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';

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

    const getDiagnosisName = (code: string) => {
      const diagnosis = diagnoses.find(d => d.code === code);
      
      return diagnosis ? diagnosis.name : 'Unknown';
    };

    return (
        <div>
            <h2>{patient.name} {genderIcon()}</h2>

            <p><b>SSN:</b> {patient.ssn}</p>
            <p><b>Occupation:</b> {patient.occupation}</p>

            <h2>Entries</h2>
            
            {patient.entries.map((entry: Entry) => (
              <div key={entry.id}>
                <p>{entry.date} - - {entry.description}</p>

                {entry.diagnosisCodes?.map(code => (
                  <ul>
                    <li>{code} - - {getDiagnosisName(code)}</li>
                  </ul>
                ))}
              </div>
            ))}
        </div>
    );
};

export default SinglePatient;