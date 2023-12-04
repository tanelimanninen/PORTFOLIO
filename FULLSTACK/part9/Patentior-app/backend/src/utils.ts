import { Gender, NewPatient, Entry } from "./types";

//STRING VALIDATION
const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

//NAME-FIELD VALIDATION
const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
      throw new Error('Name incorrect or missing');
    }
  
    return name;
};

//DATE FORMAT VALIDATION
const isDate = (dateOfBirth: string): boolean => {
    return Boolean(Date.parse(dateOfBirth));
};

//DATE-OF-BIRTH-FIELD VALIDATION
const parseDate = (dateOfBirth: unknown): string => {
    if (!isString(dateOfBirth) || !isDate(dateOfBirth)) {
        throw new Error('Incorrect date: ' + dateOfBirth);
    }
    return dateOfBirth;
};

//SSN-FIELD VALIDATION
const parseSSN = (ssn: unknown): string => {
    if (!ssn || !isString(ssn)) {
      throw new Error('SSN incorrect or missing');
    }
  
    return ssn;
};

//GENDER FORMAT VALIDATION
const isGender = (param: string): param is Gender => {
    return Object.values(Gender).map(g => g.toString()).includes(param);
};

//GENDER-FIELD VALIDATION
const parseGender = (gender: unknown): Gender => {
    if (!isString(gender) || !isGender(gender)) {
      throw new Error('Incorrect gender: ' + gender);
    }
    return gender;
};

//OCCUPATION-FIELD VALIDATION
const parseOccupation = (occupation: unknown): string => {
    if (!occupation || !isString(occupation)) {
      throw new Error('Occupation incorrect or missing');
    }
  
    return occupation;
};

//ENTRIES TYPE-FIELD VALIDATION
const isValidEntryType = (type: unknown): type is Entry['type'] => {
    return ["Hospital", "OccupationalHealthcare", "HealthCheck"].includes(type as string);
};

// ENTRIES-FIELD VALIDATION
const parseEntries = (entries: unknown): Entry[] => {
    if (!Array.isArray(entries)) {
        throw new Error('Entries must be an array');
    }

    entries.forEach((entry: Entry) => {
        if (!isValidEntryType(entry.type)) {
            throw new Error(`Invalid entry type: ${entry.type}`);
        }
    });

    return entries;
};


const toNewPatient = (object: unknown): NewPatient => {
    if ( !object || typeof object !== 'object' ) {
        throw new Error('Incorrect or missing data');
    }

    if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object && 'entries' in object)  {
        const newPatient: NewPatient = {
            name: parseName(object.name),
            dateOfBirth: parseDate(object.dateOfBirth),
            ssn: parseSSN(object.ssn),
            gender: parseGender(object.gender),
            occupation: parseOccupation(object.occupation),
            entries: parseEntries(object.entries)
        };

        return newPatient;
    }

    throw new Error('Incorrect data: some fields are missing');
};

export default toNewPatient;