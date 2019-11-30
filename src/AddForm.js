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
    width: "135px"
  },
  FormItemReviews: {
    margin: "10px",
    width: "80px"
  },
  FormItemSelect: {
    margin: "10px",
    width: "100px"
  },

  submitButton: {
    margin: "20px 10px"
  },
  menu: {
    width: 200
  }
}))

export default function Form(props) {
  const classes = useStyles()

  const initialFormState = {
    id: null,
    name: "",
    date: new Date(),
    doneNum: 0,
    interval: {
      value: "",
      label: ""
    },
    category: { id: "", name: "" }
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
          props.addLearnItem(item)
          setItem(initialFormState)
        }}
      >
        <TextField
          name="name"
          className={classes.FormItem}
          value={item.name}
          required
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
        >
          {props.intervals.map(option => (
            <MenuItem key={option.value} value={option}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          name="category"
          className={classes.FormItemSelect}
          value={item.category}
          onChange={handleInputChange}
          label="Category"
          select
        >
          {props.categories.map(option => (
            <MenuItem key={option.id} value={option}>
              {option.name}
            </MenuItem>
          ))}
        </TextField>
        <Button
          className={classes.submitButton}
          type="submit"
          startIcon={<SaveIcon />}
          color="primary"
          variant="outlined"
        >
          Add Item
        </Button>
      </form>
    </Paper>
  )
}
