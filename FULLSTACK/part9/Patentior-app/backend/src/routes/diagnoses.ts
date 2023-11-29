import express from 'express';
import diagnoseService from '../services/diagnoseService';

const router = express.Router();

router.get('/', (_req, res) => {
    //ALL DATA
    res.send(diagnoseService.getDiagnoses());
    console.log('Fetched all diagnoses');
});

export default router;