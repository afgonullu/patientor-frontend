/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from "react"
import axios from "axios"
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom"
import { Button, Divider, Header, Container } from "semantic-ui-react"

import { apiBaseUrl } from "./constants"
import { useStateValue, setPatients } from "./state"
import { Patient } from "./types"

import PatientListPage from "./PatientListPage"
import PatientProfile from "./PatientProfile"

const App: React.FC = (props): JSX.Element => {
  console.log(props)
  const [, dispatch] = useStateValue()

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
      <Router>
        <Container>
          <Header as="h1">Patientor</Header>
          <Button as={Link} to="/" primary>
            Home
          </Button>
          <Divider hidden />
          <Switch>
            <Route path="/patients/:id" component={PatientProfile} />
            <Route path="/" component={PatientListPage} />
          </Switch>
        </Container>
      </Router>
    </div>
  )
}

export default App
