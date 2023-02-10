import React from 'react'
import axios from 'axios'

import { apiBaseUrl } from '../constants'
import { setSinglePatient, useStateValue } from '../state'
import { useParams } from 'react-router-dom'
import { Patient } from '../types'

import FemaleIcon from '@mui/icons-material/Female'
import MaleIcon from '@mui/icons-material/Male'

const SinglePatient = () => {
  const [{ patient, diagnoses }, dispatch] = useStateValue()

  const { id } = useParams<{ id: string }>()

  React.useEffect(() => {
    if (id) {
      if (patient && patient.id === id) {
        return
      }
      const fetchSinglePatient = async () => {
        try {
          const response = await axios.get<Patient>(
            `${apiBaseUrl}/patients/${id}`,
          )

          const { data: singlePatientFromApi } = response

          dispatch(setSinglePatient(singlePatientFromApi))
        } catch (error) {
          console.error(error)
        }
      }

      void fetchSinglePatient()
    }
  }, [dispatch, id])

  if (!patient) {
    return <p>loading...</p>
  }
  return (
    <div>
      <h2>{patient.name}</h2>
      <p>{patient.gender === 'male' && <MaleIcon />}</p>
      <p>{patient.gender === 'female' && <FemaleIcon />}</p>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      <h3>entries</h3>
      <div>
        {patient.entries.map((entry) => {
          return (
            <div key={entry.id}>
              {entry.description}
              <ul>
                {entry.diagnosisCodes?.map((code) => (
                  <li key={code}>
                    {code} {diagnoses[code].name}
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default SinglePatient
