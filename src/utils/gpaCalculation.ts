export const convertPercentageToGPA = (percentageGrade: number): number => {
    return percentageGrade * 0.04
}

export const convertNumberToGPA = (germanGrade: number,  baseGPA: number, gpaIncrement: number): number => {
    return Math.max(0, baseGPA - (germanGrade - 1) * gpaIncrement)
}

export const convertLetterToGPA = (letterGrade: string, baseGPA: number, gpaIncrement: number): number => {
    const asciiA: number = "A".charCodeAt(0)
    let gpa: number = baseGPA - (letterGrade.toUpperCase().charCodeAt(0) - asciiA) * gpaIncrement
    gpa = Math.max(0, Math.min(baseGPA, gpa))
    return Number(gpa.toFixed(2))
}

export const calculateGPAStatistics = (gpas: number[]): { averageGPA: number } => {
    const totalGPA: number = gpas.reduce((sum, gpa) => sum + gpa, 0)
    
    const averageGPA: number = totalGPA / gpas.length
    
    return { averageGPA }
}

export const convertGPAToPercentage = (gpa: number): number => {
    return gpa * 25
}

export const convertGPAToLetter = <T>(gpa: number, baseGPA: number, gpaDecrement: number, grades: T[]): T | undefined => {
    let gradeIndex: number = Math.round((baseGPA - gpa) / gpaDecrement)
    gradeIndex = Math.max(0, Math.min(grades.length - 1, gradeIndex))
    return grades[gradeIndex]
}


export const convertGPAToNumber = <T>(gpa: number, baseGPA: number, gpaIncrement: number, grades: T[]): T | undefined => {
    const germanGrade: any = Math.round(((baseGPA - gpa) / gpaIncrement) + 1).toFixed(2)
    return grades[Math.max(1, Math.min(grades.length, germanGrade)) - 1]
}
