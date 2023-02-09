import React from 'react'
import axios from 'axios'

import { apiBaseUrl } from '../constants'
import { useStateValue } from '../state'
import { useParams } from 'react-router-dom'
import { Patient } from '../types'

const SinglePatient = () => {
  console.log('singlePatient')
  const [{ patient }, dispatch] = useStateValue()

  const { id } = useParams<{ id: string }>()

  React.useEffect(() => {
    const fetchSinglePatient = async () => {
      try {
        const { data: singlePatientFromApi } = await axios.get<Patient>(
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          `${apiBaseUrl}/patients/${id}`,
        )

        dispatch({ type: 'SET_SINGLE_PATIENT', payload: singlePatientFromApi })
      } catch (error) {
        console.error(error)
      }
    }

    void fetchSinglePatient()
  }, [dispatch, id])

  if (!patient) {
    return <p>loading...</p>
  }
  return (
    <div>
      Single patient info
      {patient.name}
    </div>
  )
}

export default SinglePatient
