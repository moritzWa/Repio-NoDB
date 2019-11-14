import React from "react"
import Paper from "@material-ui/core/Paper"
import TextField from "@material-ui/core/TextField"
import useInputState from "./hooks/useInputState"

export default function Form({ addLearnItem }) {
  const [name, handleChangeName, resetName] = useInputState([])
  const [date, handleChangeDate, resetDate] = useInputState([])

  let value = { name, date }

  return (
    <Paper>
      <form
        onSubmit={e => {
          e.preventDefault()
          addLearnItem(value)
          resetName()
          resetDate()
          console.log(value)
        }}
      >
        <TextField value={name} onChange={handleChangeName} />
        <TextField
          id="date"
          label="Birthday"
          type="date"
          defaultValue="2017-05-24"
          value={date}
          InputLabelProps={{
            shrink: true
          }}
          onChange={handleChangeDate}
        />
      </form>
    </Paper>
  )
}
