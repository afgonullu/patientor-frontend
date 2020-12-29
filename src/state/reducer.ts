/* eslint-disable @typescript-eslint/member-delimiter-style */
import { State } from "./state"
import { Diagnose, HealthCheckEntry, Patient } from "../types"

export type Action =
  | {
      type: "SET_PATIENT_LIST"
      payload: Patient[]
    }
  | {
      type: "SET_DIAGNOSES_LIST"
      payload: Diagnose[]
    }
  | {
      type: "ADD_OR_UPDATE"
      payload: Patient
    }
  | {
      type: "ADD_PATIENT"
      payload: Patient
    }
  | {
      type: "ADD_ENTRY"
      id: string
      payload: HealthCheckEntry
    }

export const setPatients = (payload: Patient[]): Action => {
  return { type: "SET_PATIENT_LIST", payload: payload }
}
export const setDiagnoses = (payload: Diagnose[]): Action => {
  return { type: "SET_DIAGNOSES_LIST", payload: payload }
}

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          // ...state.patients,
        },
      }
    case "SET_DIAGNOSES_LIST":
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (memo, diagnose) => ({ ...memo, [diagnose.code]: diagnose }),
            {}
          ),
        },
      }
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      }
    case "ADD_ENTRY":
      const patient = state.patients[action.id]
      delete state.patients[action.id]
      patient.entries.push(action.payload)
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.id]: patient,
        },
      }
    case "ADD_OR_UPDATE":
      return state.patients[action.payload.id]
        ? state
        : {
            ...state,
            patients: {
              ...state.patients,
              [action.payload.id]: action.payload,
            },
          }
    default:
      return state
  }
}
