interface Values {
    hours: number[];
    target: number;
}

interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

const parseArguments2 = (args: string[]): Values | null => {
    const hours = args.slice(2, -1).map(arg => Number(arg));
    const target = Number(args[args.length - 1]);

    if (hours.every(hour => !isNaN(hour)) && !isNaN(target)) {
        return {
            hours,
            target
        };
    } else {
        return null;
    }
};

export const calculateExercises = (v: Values): Result => {
    const periodLength = v.hours.length;
    const trainingDays = v.hours.filter(value => value !== 0).length;

    if (trainingDays === 0) {
        throw new Error('No training days recorded.');
    }

    const averagePerDay = v.hours.reduce((accumulator, currentValue) => accumulator + currentValue, 0) / trainingDays;

    let rating: number = 0;
    let ratingDescription: string = "Error making description";

    if (averagePerDay < 2 ) {
        rating = 1;
        ratingDescription = "You suck!";
    }
    else if (averagePerDay >= 2 && averagePerDay < 4) {
        rating = 2;
        ratingDescription = "Okay, but not great...";
    }
    else if (averagePerDay >= 4) {
        rating = 3;
        ratingDescription = "You're the best there's ever been.";
    }

    //SUCCESS IS TRUE WHEN RATING IS EQUAL OR BETTER THAN TARGET VALUE
    const success = v.target <= rating;

    return { periodLength, trainingDays, success, rating, ratingDescription, target: v.target, average: averagePerDay };
};

const argsResult2 = parseArguments2(process.argv);

if (argsResult2) {
    const { hours, target } = argsResult2;
    const result2 = calculateExercises({ hours, target });
    console.log(result2);
} else {
    console.error('No command line arguments. Please provide valid numerical values for hours and target, if you want to get results to the terminal console.');
}