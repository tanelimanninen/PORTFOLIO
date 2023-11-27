interface BMIValues {
    height: number;
    mass: number;
}

const parseArguments = (args: string[]): BMIValues => {
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
          height: Number(args[2]),
          mass: Number(args[3])
        }
    } else {
        throw new Error('Provided values were not numbers!');
    }
}

const calculateBMI = (height: number, mass: number): string => {
    const BMI = mass / ((height / 100) ** 2);
    //console.log(BMI);

    let result;

    if (BMI < 16) {
        result = "Underweight (Severe thinness)"
    }
    else if (BMI >= 16 && BMI < 17) {
        result = "Underweight (Moderate thinness)"
    }
    else if (BMI >= 17 && BMI < 18.5) {
        result = "Underweight (Mild thinness)"
    }
    else if (BMI >= 18.5 && BMI < 25) {
        result = "Normal (healthy weight)"
    }
    else if (BMI >= 25 && BMI < 30) {
        result = "Overweight (Pre-obese)"
    }
    else if (BMI >= 30 && BMI < 35) {
        result = "Obese (Class I)"
    }
    else if (BMI >= 35 && BMI < 40) {
        result = "Obese (Class II)"
    }
    else if (BMI >= 40) {
        result = "Obese (Class III)"
    }

    return result
}


const { height, mass } = parseArguments(process.argv);
const result2 = calculateBMI(height, mass);
console.log(result2);