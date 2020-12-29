/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/member-delimiter-style */
import React from "react"
import axios from "axios"
import { useStateValue, setPatients, setDiagnoses } from "../state"
import { apiBaseUrl } from "../constants"
import { Diagnose, HealthCheckEntry, Patient } from "../types"
import { match } from "react-router"
import EntryDetails from "../components/EntryDetails"
import AddEntryModal from "../AddEntryModal"
import { Button } from "semantic-ui-react"
import { EntryFormValues } from "../AddEntryModal/AddEntryForm"

interface Props {
  match: match<{ id: string }>
}

const PatientProfile: React.FC<Props> = (props) => {
  console.log(props)
  const [{ patients, diagnoses }, dispatch] = useStateValue()
  console.log("now patients")
  console.log(patients)

  const [modalOpen, setModalOpen] = React.useState<boolean>(false)
  const [error, setError] = React.useState<string | undefined>()

  const openModal = (): void => setModalOpen(true)

  const closeModal = (): void => {
    setModalOpen(false)
    setError(undefined)
  }

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      console.log(values)
      const { data: newEntry } = await axios.post<HealthCheckEntry>(
        `${apiBaseUrl}/api/patients/${props.match.params.id}/entries/`,
        values
      )
      dispatch({
        type: "ADD_ENTRY",
        id: props.match.params.id,
        payload: newEntry,
      })
      console.log(newEntry)
      closeModal()
    } catch (e) {
      console.error(e.response.data)
      setError(e.response.data.error)
    }
  }

  React.useEffect(() => {
    const fetchMyAPI = async () => {
      const { data: diagnosesFromApi } = await axios.get<Diagnose[]>(
        `${apiBaseUrl}/api/diagnoses`
      )
      dispatch(setDiagnoses(diagnosesFromApi))
      // const { data: patientListFromApi } = await axios.get<Patient[]>(
      //   `${apiBaseUrl}/api/patients`
      // )
      // dispatch(setPatients(patientListFromApi))
    }

    fetchMyAPI()
  }, [dispatch])

  const { name, gender, entries, occupation, dateOfBirth, ssn } = patients[
    props.match.params.id
  ]

  if (
    Object.keys(diagnoses).length === 0 ||
    Object.keys(patients).length === 0
  ) {
    return <h1>loading...</h1>
  }
  return (
    <div>
      <h2>
        {name} - {gender}
      </h2>
      <p>{ssn}</p>
      <h3>Occupation : {occupation}</h3>
      <p>Date of Birth : {dateOfBirth}</p>
      <h3>entries</h3>
      {entries.map((entry) => (
        <div key={entry.id}>
          {/* <p>
            {entry.date} - {entry.description}
          </p>
          <ul>
            {entry.diagnosisCodes?.map((diag) => (
              <li>
                {diag} - {diagnoses[diag].name}
              </li>
            ))}
          </ul> */}
          <EntryDetails entry={entry} />
        </div>
      ))}
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button onClick={() => openModal()}>Add New Entry</Button>
    </div>
  )
}

export default PatientProfile
