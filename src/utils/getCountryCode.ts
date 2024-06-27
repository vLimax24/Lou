import countries from "./countries.json"

export const getCountryCode = (countryName: string) => {
  const country = countries.find(
    c => c.name.toLowerCase() === countryName.toLowerCase()
  )
  return country ? country.code : null
}
