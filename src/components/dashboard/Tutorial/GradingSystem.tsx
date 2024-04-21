"use client"
import React from "react"

import { Card } from "@/components/ui/card"
import { Doc } from "@/convex/_generated/dataModel"

type Props = {
  selectedCountry: any;
  setSelectedCountry: React.Dispatch<any>;
  countries?: Doc<"gradingSystems">[];
};

const GradingSystem = ({selectedCountry, setSelectedCountry, countries}: Props) => {
  const toggleCountry = (system: string) => {
    setSelectedCountry((prevSystem: any) =>
      prevSystem === system ? null : system
    )
  }

  const isCountrySelected = (country: string) => {
    return selectedCountry === country
  }

  return (
    <div>
      <div className="grid grid-cols-1 gap-2">
        {countries?.map(country => (
          <Card
            key={country._id}
            onClick={() => toggleCountry(country._id)}
            className={`relative p-4 ${isCountrySelected(country._id) ? "bg-black bg-opacity-30" : ""}`}
          >
            <h1 className="p-1 text-2xl font-semibold">
              {country.countryName}
            </h1>
          </Card>
        ))}
      </div>

    </div>
  )
}

export default GradingSystem
