/* eslint-disable @typescript-eslint/member-delimiter-style */
import React from "react"
import axios from "axios"
import { useParams } from "react-router-dom"
import { useStateValue } from "../state"
import { apiBaseUrl } from "../constants"
import { Patient } from "../types"

interface Props {
  patientProfile: Patient
}

const PatientProfile: React.FC<Props> = ({ patientProfile }) => {
  const [{ patients }, dispatch] = useStateValue()
  const { id } = useParams<{ id: string }>()

  //   React.useEffect(() => {
  //     const fetchPatient = async () => {
  //       try {
  //         const { data: patientFromApi } = await axios.get<Patient>(
  //           `${apiBaseUrl}/api/patients/${id}`
  //         )
  //         console.log(patientFromApi)
  //         console.log(patients)
  //         dispatch({ type: "ADD_OR_UPDATE", payload: patientFromApi })
  //         console.log(patients)
  //       } catch (e) {
  //         console.error(e)
  //       }
  //     }
  //     fetchPatient()
  //   }, [dispatch, id, patients])

  const { name, gender, occupation, dateOfBirth } = patientProfile

  //   if (patients === undefined) {
  //     return <h1>patients null</h1>
  //   }

  //   if (id === null) {
  //     return <h1>no id</h1>
  //   }

  const fetchData = () => {
    const fetchPatient = async () => {
      try {
        const { data: patientFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/api/patients/${id}`
        )
        console.log(patientFromApi)
        console.log(patients)
        dispatch({ type: "ADD_OR_UPDATE", payload: patientFromApi })
        console.log(patients)
      } catch (e) {
        console.error(e)
      }
    }
    fetchPatient()
  }

  if (!patientProfile) {
    return <div>Undefined</div>
  }
  return (
    <div>
      <h2>
        {name} - {gender}
      </h2>
      <h3>Occupation : {occupation}</h3>
      <p>Date of Birth : {dateOfBirth}</p>
      <button onClick={fetchData}>fetch</button>
    </div>
  )
}

export default PatientProfile
