import React, { useState } from "react"
import {
  Paper,
  Divider,
  TextField,
  Chip,
  Select,
  MenuItem
} from "@material-ui/core"

import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles({
  root: {
    borderRadius: 0,
    margin: "none",
    padding: "15px",
    border: "none"
  },
  settingArea: {
    maxWidth: "500px",
    borderRadius: 0,
    margin: "none",
    border: "none",
    boxShadow: "none"
  },
  settingItem: {
    padding: "10px",
    alignItems: "left"
  },
  menuItem: {
    fontWeight: "bold",
    padding: "15px 0"
  },
  menuSubItem: {
    fontSize: "14px",
    padding: "10px",
    paddingBottom: "5px",
    fontWeight: "bolder",
    padding: "15px 0",
    color: "#4071BC"
  },
  label: {
    fontSize: "14px",
    display: "inline-block",
    padding: "15px 0px 10px 10px",
    minWidth: "230px",

    fontWeight: "regular"
  },
  FormItemSelect: {
    width: "100px"
  },
  settingTool: {
    display: "inline-block",
    maxWidth: "100px"
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
    display: "inline-block"
  },
  chip: {
    margin: 2
  },
  divider: {
    margin: "15px"
  },
  dividerBig: {
    width: "100%",
    margin: "20px 0",
    padding: ".3px"
  }
})

export default function More(props) {
  const classes = useStyles()

  const initialFormState = {
    categories: [{ id: 5, name: "" }],
    intervals: [{ name: "longterm", value: [1, 7, 14, 28, 56, 112, 224] }]
  }

  const [category, setCategory] = useState(initialFormState)
  const [defaultCategory, setDefaultCategory] = useState("")

  const handleInputChange = event => {
    const { name, value } = event.target
    setCategory({ ...category, [name]: value })
    console.log(value)
  }

  return (
    <div className={classes.root}>
      <div className={classes.menuItem}>Settings</div>
      <div className={classes.menuSubItem}>Category</div>

      <Paper className={classes.settingArea}>
        <div className={classes.label}>Create new Category</div>
        <div className={classes.settingTool}>
          <form
            className={classes.Form}
            onSubmit={e => {
              e.preventDefault()
              props.addCategory(category)
            }}
          >
            <TextField
              name="name"
              value={category.name}
              required
              placeholder="i.e. Business"
              onChange={handleInputChange}
            />
          </form>
        </div>

        <div className={classes.label}>my Categories:</div>
        <div className={classes.chips}>
          {props.categories.map(cat => (
            <Chip
              className={classes.chip}
              test={console.log(cat.name)}
              label={cat.name}
              onDelete={() => props.deleteCategory(cat.id)}
            />
          ))}
        </div>

        <div className={classes.label}>Choose defauld category</div>
        <div className={classes.settingTool}>
          <TextField
            name="defaultCategory"
            className={classes.FormItemSelect}
            value={defaultCategory}
            select
            label="Default"
            onChange={handleInputChange}
            defaultValue="Businessbook"
            SelectProps={{
              MenuProps: {
                className: classes.menu
              }
            }}
          >
            {props.categories.map(option => (
              <MenuItem key={option.value} value={option}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
        </div>

        <Divider className={classes.divider} />

        <div className={classes.menuSubItem}>Account</div>
        <div className={classes.label}>Save Data</div>
        <div className={classes.settingTool}>Icontoggler/button</div>

        <Divider className={classes.dividerBig} />
      </Paper>

      <div className={classes.menuItem}>About</div>
      <div className={classes.label}>What is Spaced Repitition?</div>
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/cVf38y07cfk"
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Spaced Repititon"
      ></iframe>
      <div className={classes.label}>
        <a
          href="https://en.wikipedia.org/wiki/Spaced_repetition"
          target="_blank"
          rel="noopener noreferrer"
        >
          Wikipedia
        </a>
      </div>
    </div>
  )
}
