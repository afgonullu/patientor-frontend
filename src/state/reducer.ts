/* eslint-disable @typescript-eslint/member-delimiter-style */
import { State } from "./state"
import { Patient } from "../types"

export type Action =
  | {
      type: "SET_PATIENT_LIST"
      payload: Patient[]
    }
  | {
      type: "ADD_OR_UPDATE"
      payload: Patient
    }
  | {
      type: "ADD_PATIENT"
      payload: Patient
    }

export const setPatients = (payload: Patient[]): Action => {
  return { type: "SET_PATIENT_LIST", payload: payload }
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
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
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
