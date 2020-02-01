/**
 * @description A Error Builder Function
 * @param errorMessage message Property of error Object
 * @param errorClass error Property of error Object
 */
export function errBuilder(errorMessage: string, errorClass?: string): CustomError {
    return {error: errorClass || undefined, message: errorMessage};
}

export interface CustomError {
    error: string | undefined;
    message: string;
}