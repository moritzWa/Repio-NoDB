import React from "react"
import useInputState from "./hooks/useInputState"

import { Paper, Select, MenuItem, Button, TextField } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import SaveIcon from "@material-ui/icons/Save"

const useStyles = makeStyles(theme => ({
  FormPaper: {
    margin: "1rem",
    backgroundColor: "white",
    padding: "3px",
    textAlign: "right"
  },
  FormItem: {
    margin: "10px"
  },
  selectEmpty: {
    marginTop: theme.spacing(3.2)
  },
  submitButton: {
    margin: "10px"
  }
}))

export default function Form({ addLearnItem, toBeChangedItem }) {
  const classes = useStyles()
  console.log(toBeChangedItem)

  const [name, handleChangeName, resetName] = useInputState([])
  const [date, handleChangeDate, resetDate] = useInputState([])
  const [doneNum, handleChangeDoneNum, resetDoneNum] = useInputState([])
  const [interval, handleChangeInterval, resetInterval] = useInputState([])
  const [tags, handleChangeTags, resetTags] = useInputState([])

  let value = { name, date, doneNum, interval, tags }

  function checkForEdit() {
    toBeChangedItem ? console.log("item found") : console.log("item not found")
  }
  checkForEdit()

  var today = new Date()
  var dd = String(today.getDate()).padStart(2, "0")
  var mm = String(today.getMonth() + 1).padStart(2, "0") //January is 0!
  var yyyy = today.getFullYear()
  today = yyyy + "-" + mm + "-" + dd

  return (
    <Paper className={classes.FormPaper}>
      <form
        className={classes.Form}
        onSubmit={e => {
          e.preventDefault()
          addLearnItem(value)
          resetName()
          resetDate()
          resetInterval()
          resetTags()
          resetDoneNum()
          console.log(value)
        }}
      >
        <TextField
          className={classes.FormItem}
          value={name}
          label="Name"
          onChange={console.log(handleChangeName)}
        />
        <TextField
          className={classes.FormItem}
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
        <TextField
          className={classes.FormItem}
          type="number"
          value={doneNum}
          label="Reviews done"
          onChange={handleChangeDoneNum}
        />
        <Select
          className={classes.selectEmpty}
          select
          value={interval}
          label="Interval"
          onChange={handleChangeInterval}
          inputProps={{
            name: "Interval",
            id: "Interval"
          }}
        >
          <MenuItem value="" disabled></MenuItem>
          <MenuItem value={"longterm"}>longterm</MenuItem>
          <MenuItem value={"shortterm"}>shortterm</MenuItem>
        </Select>
        {/*         <TextField value={tags} onChange={handleChangeTags} label="Tags" />
         */}
        <Button
          classNames={classes.submitButton}
          startIcon={<SaveIcon />}
          type="submit"
          startIcon={<SaveIcon />}
          color="primary"
        >
          Save
        </Button>
      </form>
    </Paper>
  )
}
