/* eslint-disable @typescript-eslint/member-delimiter-style */
import React from "react"
import { Entry } from "../types"

interface Props {
  entry: Entry
}

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  )
}

const EntryDetails: React.FC<Props> = ({ entry }) => {
  switch (entry.type) {
    case "HealthCheck":
      return (
        <div>
          <p>{entry.date}</p>
          <p>{entry.type}</p>
          <p>{entry.description}</p>
          <p>{entry.healthCheckRating}</p>
        </div>
      )
    case "Hospital":
      return (
        <div>
          <p>{entry.date}</p>
          <p>{entry.type}</p>
          <p>{entry.description}</p>
          <p>{entry.discharge?.criteria}</p>
        </div>
      )
    case "OccupationalHealthcare":
      return (
        <div>
          <p>{entry.date}</p>
          <p>{entry.type}</p>
          <p>{entry.description}</p>
          <p>{entry.employerName}</p>
        </div>
      )
    default:
      return assertNever(entry)
  }
}

export default EntryDetails
