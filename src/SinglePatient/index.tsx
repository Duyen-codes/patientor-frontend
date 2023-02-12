import React from 'react'
import axios from 'axios'

import { apiBaseUrl } from '../constants'
import { setSinglePatient, useStateValue } from '../state'
import { useParams } from 'react-router-dom'
import { NewEntry, Patient } from '../types'

import FemaleIcon from '@mui/icons-material/Female'
import MaleIcon from '@mui/icons-material/Male'
import EntryDetails from '../EntryDetails'
import { Button } from '@material-ui/core'
import AddEntryModal from '../AddEntryModal'

const SinglePatient = () => {
  const [{ patient }, dispatch] = useStateValue()

  const { id } = useParams<{ id: string }>()

  const [modalOpen, setModalOpen] = React.useState<boolean>(false)
  const [error, setError] = React.useState<string>()

  const openModal = (): void => setModalOpen(true)

  const closeModal = (): void => {
    setModalOpen(false)
    setError(undefined)
  }

  const submitNewEntry = async (values: NewEntry) => {
    if (id) {
      try {
        const { data: newEntry } = await axios.post<NewEntry>(
          `${apiBaseUrl}/patients/${id}/entries`,
          values,
        )
        console.log('newEntry', newEntry)
      } catch (error) {
        console.error(error)
      }
    }
  }

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
        {patient.entries.map((entry) => (
          <EntryDetails key={entry.id} entry={entry} />
        ))}
      </div>

      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button variant="contained" onClick={() => openModal()}>
        Add New Entry
      </Button>
    </div>
  )
}

export default SinglePatient
