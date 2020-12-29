/* eslint-disable @typescript-eslint/member-delimiter-style */
import React from "react"
import { Grid, Button } from "semantic-ui-react"
import { Field, Formik, Form } from "formik"

import { TextField, SelectField, GenderOption, NumberField } from "./FormField"
import { Gender, HealthCheckEntry, Patient } from "../types"

/*
 * use type Patient, but omit id and entries,
 * because those are irrelevant for new patient object.
 */
export type EntryFormValues = Omit<HealthCheckEntry, "id">

interface Props {
  onSubmit: (values: EntryFormValues) => void
  onCancel: () => void
}

const genderOptions: GenderOption[] = [
  { value: Gender.Male, label: "Male" },
  { value: Gender.Female, label: "Female" },
  { value: Gender.Other, label: "Other" },
]

export const AddPatientForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  return (
    <Formik
      initialValues={{
        type: "HealthCheck",
        date: "",
        description: "",
        healthCheckRating: 0,
        specialist: "",
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required"
        const errors: { [field: string]: string } = {}
        if (!values.date) {
          errors.date = requiredError
        }
        if (!values.description) {
          errors.description = requiredError
        }
        if (!values.healthCheckRating) {
          errors.healthCheckRating = requiredError
        }
        if (!values.specialist) {
          errors.specialist = requiredError
        }
        return errors
      }}
    >
      {({ isValid, dirty }) => {
        return (
          <Form className="form ui">
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Health Check Rating"
              placeholder="Health Check Rating"
              name="healthCheckRating"
              component={NumberField}
            />
            {/* <SelectField label="Gender" name="gender" options={genderOptions} /> */}
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        )
      }}
    </Formik>
  )
}

export default AddPatientForm
