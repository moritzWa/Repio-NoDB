import React, { useState } from "react"

import { Paper, MenuItem, Button, TextField } from "@material-ui/core"
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
  FormItemDate: {
    margin: "10px",
    width: "120px"
  },
  FormItemReviews: {
    margin: "10px",
    width: "80px"
  },
  FormItemSelect: {
    margin: "10px",
    width: "100px"
  },
  FormItemTags: {
    margin: "10px",
    width: "100px"
  },
  submitButton: {
    margin: "20px"
  },
  menu: {
    width: 200
  }
}))

const intervals = [
  {
    value: "1-2-3-4",
    label: "longterm"
  },
  {
    value: "1-1-3",
    label: "shortterm"
  }
]

export default function Form({ addLearnItem }) {
  const classes = useStyles()

  const initialFormState = {
    id: null,
    name: "",
    date: new Date(),
    doneNum: 0,
    interval: "",
    reps: [
      { Nr: 1, distence: 1 },
      { Nr: 2, distence: 7 },
      { Nr: 3, distence: 14 },
      { Nr: 4, distence: 28 },
      { Nr: 5, distence: 56 },
      { Nr: 6, distence: 112 },
      { Nr: 7, distence: 224 },
      { Nr: 8, distence: 448 }
    ],
    tags: ""
  }

  const [item, setItem] = useState(initialFormState)

  const handleInputChange = event => {
    const { name, value } = event.target
    setItem({ ...item, [name]: value })
  }

  return (
    <Paper className={classes.FormPaper}>
      <form
        className={classes.Form}
        onSubmit={e => {
          e.preventDefault()
          addLearnItem(item)
          setItem(initialFormState)
        }}
      >
        <TextField
          name="name"
          className={classes.FormItem}
          value={item.name}
          required
          multiline
          label="Learn Item Name"
          placeholder="i.e. XYZ Podcast/Book"
          onChange={handleInputChange}
        />
        <TextField
          name="date"
          className={classes.FormItemDate}
          value={item.date}
          id="date"
          label="Date added"
          type="date"
          InputLabelProps={{
            shrink: true
          }}
          onChange={handleInputChange}
        />
        <TextField
          name="doneNum"
          className={classes.FormItemReviews}
          type="number"
          value={item.doneNum}
          label="Reps done"
          onChange={handleInputChange}
        />
        <TextField
          name="interval"
          className={classes.FormItemSelect}
          value={item.interval}
          select
          label="Interval"
          onChange={handleInputChange}
          defaultValue="longterm"
          SelectProps={{
            MenuProps: {
              className: classes.menu
            }
          }}
        >
          {intervals.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          name="tags"
          className={classes.FormItemTags}
          value={item.tags}
          onChange={handleInputChange}
          label="Tags"
        />

        <Button
          className={classes.submitButton}
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
