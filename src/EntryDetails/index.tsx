import React from 'react'
import { Entry } from '../types'

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`,
  )
}
const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case 'Hospital':
      return (
        <div>
          {entry.date}
          {entry.description}

          <p> diagnose by {entry.specialist}</p>
        </div>
      )

    case 'HealthCheck':
      return (
        <div>
          {entry.date}
          {entry.description}
          <p>Healthcheck rating: {entry.healthCheckRating}</p>
        </div>
      )

    case 'OccupationalHealthcare':
      return (
        <div>
          {entry.date}
          {entry.employerName}
          {entry.description}

          <p> diagnose by {entry.specialist}</p>
        </div>
      )

    default:
      return assertNever(entry)
  }
}

export default EntryDetails
