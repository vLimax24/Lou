import React from 'react'
import { EditNote } from './NoteDialog'

describe('<EditNote />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<EditNote />)
  })
})