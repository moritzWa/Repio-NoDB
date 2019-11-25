import React, { useState, useEffect } from "react"

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

export default function EditItemForm(props) {
  const classes = useStyles()

  const [item, setItem] = useState(props.currentItem)

  useEffect(() => {
    setItem(props.currentItem)
  }, [props])

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
          props.updateItem(item.id, item)
          console.log(item.id, item)
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
          label="Reviews done"
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
          {intervals.map(option => (
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
          Save Changes
        </Button>
      </form>
    </Paper>
  )
}
