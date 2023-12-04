import express from 'express';

import patientService from '../services/patientService';
import toNewPatient from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
    //ALL DATA WITHOUT SSN FIELD
    res.send(patientService.getPatients());
    console.log('Fetched all patients');
});

router.post('/', (req, res) => {
    try {
        const newPatient = toNewPatient(req.body);

        const addedPatient = patientService.addPatient(newPatient);

        res.json(addedPatient);
    } catch (error: unknown) {
        let errorMessage = 'Something went sideways';

        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }

        res.status(400).send(errorMessage);
    }
});

router.get('/:id', (req, res) => {
    try {
        const patientId = req.params.id;

        const patient = patientService.getPatientById(patientId);

        if (!patient) {
            res.status(404).send('Patient not found');
            return;
        }

        res.json(patient);
    } catch (error: unknown) {
        let errorMessage = 'Something went sideways';

        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }

        res.status(400).send(errorMessage);
    }
});

export default router;