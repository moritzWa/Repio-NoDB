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
  selectEmpty: {
    marginTop: theme.spacing(3.2)
  },
  submitButton: {
    margiaen: "20px"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "100px"
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
          className={classes.FormItem}
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
          className={classes.FormItem}
          type="number"
          value={item.doneNum}
          label="Reviews done"
          onChange={handleInputChange}
        />
        <TextField
          name="interval"
          className={classes.textField}
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
          Save Changes
        </Button>
      </form>
    </Paper>
  )
}
