import React from "react"
import axios from "axios"
import { Route, Link, Switch, useRouteMatch } from "react-router-dom"
import { Button, Divider, Header, Container } from "semantic-ui-react"

import { apiBaseUrl } from "./constants"
import { useStateValue, setPatients } from "./state"
import { Patient, Gender } from "./types"

import PatientListPage from "./PatientListPage"
import PatientProfile from "./PatientProfile"

const App: React.FC = (): JSX.Element => {
  const [{ patients }, dispatch] = useStateValue()

  const patientMatch = useRouteMatch<{ id: string }>("/patients/:id")
  const patientProfile = patientMatch
    ? patients[patientMatch.params.id]
    : {
        id: "string;",
        name: "string;",
        occupation: "string;",
        gender: Gender.Male,
        ssn: "string;",
        dateOfBirth: "string;",
      }

  React.useEffect(() => {
    axios.get<void>(`${apiBaseUrl}/ping`)

    const fetchPatientList = async () => {
      try {
        const { data: patientListFromApi } = await axios.get<Patient[]>(
          `${apiBaseUrl}/api/patients`
        )
        dispatch(setPatients(patientListFromApi))
      } catch (e) {
        console.error(e)
      }
    }
    fetchPatientList()
  }, [dispatch])

  return (
    <div className="App">
      <Container>
        <Header as="h1">Patientor</Header>
        <Button as={Link} to="/" primary>
          Home
        </Button>
        <Divider hidden />
        <Switch>
          <Route path="/patients/:id">
            <PatientProfile patientProfile={patientProfile} />
          </Route>
          <Route path="/" render={() => <PatientListPage />} />
        </Switch>
      </Container>
    </div>
  )
}

export default App
