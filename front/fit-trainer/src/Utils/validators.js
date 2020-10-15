export const required = (value) => {
    if(value) return undefined;
    return 'Required field!';
}

export const isEmail = (value) => {
    if(value.includes("@")) return undefined;
    return 'Email must contain @ symbol!';
}
export const minLengthCreator = (minLength) => (value) => {
    if(value.length < minLength) return `Minimum length of field ${minLength} symbols`;
    return undefined;
}
export const minPassCreator = (minLength) => (value) => {
    if(value.length < minLength) return `Minimum length of password ${minLength} symbols`;
    return undefined;
}
export const passValidationMatch = (value, allValues) => {
    if(value !== allValues.password) return `Passwords didn't match!`;
    return undefined;
}