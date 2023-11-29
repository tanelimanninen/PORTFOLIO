import express from 'express';
import patientService from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
    //ALL DATA WITHOUT SSN FIELD
    res.send(patientService.getPatients());
    console.log('Fetched all patients');
});

export default router;