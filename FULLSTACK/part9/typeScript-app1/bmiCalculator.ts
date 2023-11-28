interface BMIValues {
    height: number;
    mass: number;
}

const parseArguments = (args: string[]): BMIValues | null => {
    if ( args.length >= 4 && !isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
          height: Number(args[2]),
          mass: Number(args[3])
        };
    } else {
        return null;
    }
};

export const calculateBMI = (height: number, mass: number): string => {
    const BMI = mass / ((height / 100) ** 2);
    //console.log(BMI);

    if (BMI < 16) {
        return "Underweight (Severe thinness)";
    }
    else if (BMI >= 16 && BMI < 17) {
        return "Underweight (Moderate thinness)";
    }
    else if (BMI >= 17 && BMI < 18.5) {
        return "Underweight (Mild thinness)";
    }
    else if (BMI >= 18.5 && BMI < 25) {
        return "Normal (Healthy weight)";
    }
    else if (BMI >= 25 && BMI < 30) {
        return "Overweight (Pre-obese)";
    }
    else if (BMI >= 30 && BMI < 35) {
        return "Obese (Class I)";
    }
    else if (BMI >= 35 && BMI < 40) {
        return "Obese (Class II)";
    }
    else if (BMI >= 40) {
        return "Obese (Class III)";
    }

    //DEFAULT RETURN VALUE
    return "BMI Calculation Error";
};


const argsResult = parseArguments(process.argv);

if (argsResult) {
    const { height, mass } = argsResult;
    const result2 = calculateBMI(height, mass);
    console.log(result2);
} else {
    console.error('No command line arguments. Please provide valid numerical values for height and mass, if you want to get results to the terminal console.');
}
