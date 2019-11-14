import React from "react"
import { Paper, Select, MenuItem } from "@material-ui/core"
import TextField from "@material-ui/core/TextField"
import useInputState from "./hooks/useInputState"

import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
  FormPaper: {
    margin: "1rem",
    backgroundColor: "white",
    padding: "3px"
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}))

export default function Form({ addLearnItem }) {
  const classes = useStyles()

  const [name, handleChangeName, resetName] = useInputState([])
  const [date, handleChangeDate, resetDate] = useInputState([])
  const [interval, handleChangeInterval, resetInterval] = useInputState([])
  const [tags, handleChangeTags, resetTags] = useInputState([])

  let value = { name, date, interval, tags }

  var today = new Date()
  var dd = String(today.getDate()).padStart(2, "0")
  var mm = String(today.getMonth() + 1).padStart(2, "0") //January is 0!
  var yyyy = today.getFullYear()
  today = yyyy + "-" + mm + "-" + dd

  return (
    <Paper className={classes.FormPaper}>
      <form
        onSubmit={e => {
          e.preventDefault()
          addLearnItem(value)
          resetName()
          resetDate()
          resetInterval()
          resetTags()
          console.log(value)
        }}
      >
        <TextField value={name} label="Name" onChange={handleChangeName} />
        <TextField
          required
          id="date"
          label="Date added"
          type="date"
          defaultValue={today}
          value={date}
          InputLabelProps={{
            shrink: true
          }}
          onChange={handleChangeDate}
        />
        <Select
          select
          value={interval}
          className={classes.selectEmpty}
          label="Interval"
          onChange={handleChangeInterval}
          inputProps={{
            name: "Interval",
            id: "Interval"
          }}
        >
          <MenuItem value={"longterm"}>longterm</MenuItem>
          <MenuItem value={"shortterm"}>shortterm</MenuItem>
        </Select>
        {/*         <TextField value={tags} onChange={handleChangeTags} label="Tags" />
         */}{" "}
      </form>
    </Paper>
  )
}
