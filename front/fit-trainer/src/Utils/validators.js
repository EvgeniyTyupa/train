export const required = (value) => {
    if(value) return undefined;
    return 'Required field!';
}

export const isEmail = (value) => {
    let rep = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if(rep.test(value)){
        return undefined;
    }
    return 'Email is not valid!';   
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