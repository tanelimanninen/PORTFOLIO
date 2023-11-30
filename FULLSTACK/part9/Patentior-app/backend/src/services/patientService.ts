import { v1 as uuid } from 'uuid';

import patients from "../../data/patients";
import { NonSensitivePatient, NewPatient, Patient } from "../types";

const getPatients = (): NonSensitivePatient[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const addPatient = ( entry: NewPatient ): Patient => {

    const newPatient = {
        id: uuid(),
        ...entry
    };

    patients.push(newPatient);

    return newPatient;
};


export default { getPatients, addPatient };