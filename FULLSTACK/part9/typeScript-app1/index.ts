import express from 'express';
import bodyParser from 'body-parser';
import { calculateBMI } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();

app.use(bodyParser.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);

    //CHECK INPUTS ARE NUMBERS
    if (isNaN(height) || isNaN(weight)) {
        return res.status(400).json({ error: 'Malformatted parameters.' });
    }

    const bmiResult = calculateBMI(height, weight);

    const response = {
        height,
        weight,
        BMI: bmiResult,
    };

    return res.json(response);
});

app.post('/exercises', (req, res) => {
    const { daily_exercises, target } = req.body;

    // Check if parameters are provided and are of the correct type
    if (!daily_exercises || !Array.isArray(daily_exercises) || daily_exercises.some(isNaN) || isNaN(target)) {
        return res.status(400).json({ error: 'Malformatted parameters.' });
    }

    try {
        const result = calculateExercises({ hours: daily_exercises, target });
        return res.json(result);
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error.' });
    }
});

const PORT = 3007;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`http://localhost:${PORT}/hello`);
    console.log(`http://localhost:${PORT}/bmi?height=180&weight=67`);
});