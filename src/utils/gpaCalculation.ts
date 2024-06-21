export const convertPercentageToGPA = (percentageGrade: number): number => {
  return percentageGrade * 0.04
}

export const convertNumberToGPA = (
  germanGrade: number,
  baseGPA: number,
  gpaIncrement: number
): number => {
  return Math.max(0, baseGPA - (germanGrade - 1) * gpaIncrement)
}

export const convertLetterToGPA = (
  letterGrade: string,
  baseGPA: number,
  gpaIncrement: number
): number => {
  const asciiA: number = "A".charCodeAt(0)
  let gpa: number =
    baseGPA - (letterGrade.toUpperCase().charCodeAt(0) - asciiA) * gpaIncrement
  gpa = Math.max(0, Math.min(baseGPA, gpa))
  return Number(gpa.toFixed(2))
}

export const calculateGPAStatistics = (gpas: number[]): number => {
  const totalGPA: number = gpas.reduce((sum, gpa) => sum + gpa, 0)
  const averageGPA: number = totalGPA / gpas.length
  return Number(averageGPA.toFixed(2))
}

export const convertGPAToPercentage = (gpa: number): number => {
  return gpa * 25
}

export const convertGPAToLetter = <T>(
  gpa: number,
  baseGPA: number,
  gpaDecrement: number,
  grades: T[]
): T | undefined => {
  // Edge case: If GPA exceeds the base GPA, return the highest grade.
  if (gpa > baseGPA) {
    return grades[0]
  }

  // Edge case: If GPA is less than 0, return the lowest grade.
  if (gpa < 0) {
    return grades[grades.length - 1]
  }

  // Calculate the index in the grades array based on the GPA.
  // Step 1: Calculate the difference between base GPA and the provided GPA.
  const gpaDifference = baseGPA - gpa

  // Step 2: Scale the difference by dividing it by gpaDecrement.
  const scaledDifference = gpaDifference / gpaDecrement

  // Step 3: Round the scaled difference to get the nearest index.
  let gradeIndex = Math.round(scaledDifference)

  // Step 4: Clamp the index to ensure it's within the valid range of the grades array.
  gradeIndex = Math.max(0, Math.min(grades.length - 1, gradeIndex))

  // Return the grade at the calculated index.
  return grades[gradeIndex]
}

export const convertGPAToNumber = (
  gpa: number,
  baseGPA: number,
  gpaIncrement: number
) => {
  const convertedGrade: any = (baseGPA - gpa) / gpaIncrement + 1

  return convertedGrade.toFixed(2)
}
