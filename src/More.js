import React, { useState } from "react"
import {
  Paper,
  Divider,
  TextField,
  Chip,
  MenuItem,
  Button
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
  addCategoryForm: {
    minWidth: "200px",
    maxHeight: "40px"
  },
  addCategoryFormInput: { maxWidth: "110px", marginRight: "20px" },
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
  },
  videoEmbed: {
    width: "100%",
    height: "275px"
  }
})

export default function More(props) {
  const classes = useStyles()

  const initialFormStateCategory = { id: null, name: "" }

  const initialFormStateInterval = { id: null, label: "", value: "" }

  const [category, setCategory] = useState(initialFormStateCategory)
  const [defaultCategory, setDefaultCategory] = useState(props.defaultCategory)

  const handleInputChangeCategories = event => {
    const { name, value } = event.target
    setCategory({ ...category, [name]: value })
    console.log(value)
  }
  const handleInputChangeDefaultCategory = event => {
    const { value } = event.target
    setDefaultCategory(value)
    props.updateDefaultCategory(value)
    console.log(value)
  }

  const [interval, setInterval] = useState(initialFormStateInterval)
  const [defaultInterval, setDefaultInterval] = useState(props.defaultInterval)

  const handleInputChangeInterval = event => {
    const { name, value } = event.target
    setInterval({ ...interval, [name]: value })
    console.log(event.target.name)
  }
  const handleInputChangeDefaultInterval = event => {
    const { value } = event.target
    setDefaultInterval(value)
    props.updateDefaultInterval(value)
    console.log(value)
  }

  return (
    <div className={classes.root}>
      <div className={classes.menuItem}>Settings</div>

      <Paper className={classes.settingArea}>
        <div className={classes.menuSubItem}>Categories</div>

        <div className={classes.label}>Create new Category</div>
        <div className={classes.settingTool}>
          <form className={classes.addCategoryForm}>
            <TextField
              name="name"
              className={classes.addCategoryFormInput}
              value={category.name}
              required
              placeholder="i.e. Business"
              onChange={handleInputChangeCategories}
            />
            <Button
              className={classes.saveButton}
              color="primary"
              type="submit"
              onClick={e => {
                e.preventDefault()
                props.addCategory(category)
                setCategory(initialFormStateCategory)
              }}
            >
              Save
            </Button>
          </form>
        </div>

        <div className={classes.label}>my Categories:</div>
        <div className={classes.chips}>
          {props.categories.map(cat => (
            <Chip
              key={cat.name}
              className={classes.chip}
              label={cat.name}
              onDelete={() => props.deleteCategory(cat.id)}
            />
          ))}
        </div>

        <div className={classes.label}>Choose defauld category</div>
        <div className={classes.settingTool}>
          <TextField
            name="defaultCategory"
            select
            value={defaultCategory}
            onChange={handleInputChangeDefaultCategory}
          >
            {props.categories.map(option => (
              <MenuItem key={option.id} value={option}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
        </div>

        {/* =======================Intervals======================== */}

        <Divider className={classes.divider} />

        <div className={classes.menuSubItem}>Intervals</div>

        <div className={classes.label}>Create new Interval</div>
        <div className={classes.settingTool}>
          <form className={classes.addCategoryForm}>
            <TextField
              name="label"
              className={classes.addCategoryFormInput}
              value={interval.label}
              required
              placeholder="ie Pitch on Thu"
              onChange={handleInputChangeInterval}
            />
            <TextField
              name="value"
              className={classes.addCategoryFormInput}
              value={interval.value}
              required
              placeholder="ie 1-7-28-112"
              onChange={handleInputChangeInterval}
            />
            <Button
              className={classes.saveButton}
              color="primary"
              type="submit"
              onClick={e => {
                e.preventDefault()
                props.addInterval(interval)
                setInterval(initialFormStateInterval)
              }}
            >
              Save
            </Button>
          </form>
        </div>

        <div className={classes.label}>my Intervals:</div>
        <div className={classes.chips}>
          {props.intervals.map(int => (
            <Chip
              key={int.label}
              className={classes.chip}
              label={int.label}
              onDelete={() => props.deleteInterval(int.id)}
            />
          ))}
        </div>

        <div className={classes.label}>Choose defauld interval</div>
        <div className={classes.settingTool}>
          <TextField
            name="defaultInterval"
            select
            value={defaultInterval}
            onChange={handleInputChangeDefaultInterval}
          >
            {props.intervals.map(option => (
              <MenuItem key={option.id} value={option}>
                {option.label}
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
      <div>video link turned of cuz of chrome dev tools warning</div>
      <iframe
        className={classes.videoEmbed}
        //src="https://www.youtube.com/embed/cVf38y07cfk"
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
