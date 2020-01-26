/**
 * @description A Error Builder Function
 * @param errorMessage lfjsdjfjljfldsdf
 * @param errorClass fhkdhkhfksd
 */
export function errBuilder(errorMessage: string, errorClass?: string): CustomError {
    return {error: errorClass || undefined ,message: errorMessage};
}

export interface CustomError {
    error: string | undefined;
    message: string;
}