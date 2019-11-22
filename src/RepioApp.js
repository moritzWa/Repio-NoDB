import React, { useState } from "react"
import PropTypes from "prop-types"

import AllList from "./AllList"
import ToReviewList from "./ToReviewList"
import AddForm from "./AddForm"
import EditItemForm from "./EditItemForm"

import SwipeableViews from "react-swipeable-views"

import { Typography, Paper, AppBar, Grid } from "@material-ui/core/"
import { Toolbar, Tabs, Tab, Box } from "@material-ui/core/"
import { makeStyles, useTheme } from "@material-ui/core/styles"

//======================  style Logic  ======================//

function TabPanel(props) {
  const { children, value, index, ...other } = props
  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
}

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`
  }
}

const useStyles = makeStyles(theme => ({
  backgroundPaper: {
    padding: 0,
    margin: 0,
    height: "100vh",
    backgroundColor: "#505050",
    borderRadius: 0
  },
  headAppBar: { height: "64px", backgroundColor: "#4071BC" },
  menuPaper: {
    margin: "1rem 1rem"
  },
  title: {
    fontFamily: "Bitter"
  },
  appBar2: {
    borderRadius: "5px 5px 0 0"
  },
  pageContent: {
    display: "flex"
  }
}))

export default function RepioApp() {
  const classes = useStyles()
  const theme = useTheme()

  const [value, setValue] = React.useState(0)
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  const handleChangeIndex = index => {
    setValue(index)
  }

  //======================  Business Logic  ======================//

  const initialLearnItems = [
    {
      id: 0,
      name: "AAA originally first",
      date: new Date("05/06/2018").toLocaleDateString("en-US"),
      reps: [
        {
          Nr: 1,
          distence: 1,
          date: new Date(
            "Wed Jun 06 2018 02:00:00 GMT+0200 (Mitteleuropäische Sommerzeit)"
          ),
          isDone: true
        },
        {
          Nr: 2,
          distence: 7,
          date: new Date(
            "Tue Jun 12 2018 02:00:00 GMT+0200 (Mitteleuropäische Sommerzeit)"
          ),
          isDone: true
        },
        {
          Nr: 3,
          distence: 14,
          date: new Date(
            "Tue Jun 19 2018 02:00:00 GMT+0200 (Mitteleuropäische Sommerzeit)"
          ),
          isDone: true
        },
        {
          Nr: 4,
          distence: 28,
          date: new Date(
            "Tue Jul 03 2018 02:00:00 GMT+0200 (Mitteleuropäische Sommerzeit)"
          ),
          isDone: true
        },
        {
          Nr: 5,
          distence: 56,
          date: new Date(
            "Tue Jul 31 2018 02:00:00 GMT+0200 (Mitteleuropäische Sommerzeit)"
          ),
          isDone: true
        },
        {
          Nr: 6,
          distence: 112,
          date: new Date(
            "Tue Sep 25 2018 02:00:00 GMT+0200 (Mitteleuropäische Sommerzeit)"
          ),
          isDone: true
        },
        {
          Nr: 7,
          distence: 224,
          date: new Date(
            "Tue Jan 15 2019 02:00:00 GMT+0100 (Mitteleuropäische Normalzeit)"
          ),
          isDone: true
        },
        {
          Nr: 8,
          distence: 448,
          date: new Date(
            "Tue Aug 27 2019 02:00:00 GMT+0200 (Mitteleuropäische Sommerzeit)"
          ),
          isDone: true
        }
      ],
      doneNum: 8,
      interval: "shortterm",
      tags: "culture"
    },
    {
      id: 2,
      name: "ZZZ originally seccond",
      date: new Date("2019-11-01").toLocaleDateString("en-US"),
      reps: [
        {
          Nr: 1,
          distence: 1,
          isDone: true,
          date: new Date(
            "Sat Nov 02 2019 01:00:00 GMT+0100 (Mitteleuropäische Normalzeit)"
          )
        },
        {
          Nr: 2,
          distence: 7,
          isDone: false,
          date: new Date(
            "i Nov 08 2019 01:00:00 GMT+0100 (Mitteleuropäische Normalzeit)"
          )
        },
        {
          Nr: 3,
          distence: 14,
          isDone: false,
          date: new Date(
            "Fri Nov 15 2019 01:00:00 GMT+0100 (Mitteleuropäische Normalzeit)"
          )
        },
        {
          Nr: 4,
          distence: 28,
          isDone: false,
          date: new Date(
            "Fri Nov 29 2019 01:00:00 GMT+0100 (Mitteleuropäische Normalzeit)"
          )
        },
        {
          Nr: 5,
          distence: 56,
          isDone: false,
          date: new Date(
            "Fri Dec 27 2019 01:00:00 GMT+0100 (Mitteleuropäische Normalzeit)"
          )
        },
        {
          Nr: 6,
          distence: 112,
          isDone: false,
          date: new Date(
            "Fri Feb 21 2020 01:00:00 GMT+0100 (Mitteleuropäische Normalzeit)"
          )
        },
        {
          Nr: 7,
          distence: 224,
          isDone: false,
          date: new Date(
            "Fri Jun 12 2020 01:00:00 GMT+0200 (Mitteleuropäische Sommerzeit)"
          )
        },
        {
          Nr: 8,
          distence: 448,
          isDone: false,
          date: new Date(
            "Fri Jan 22 2021 01:00:00 GMT+0100 (Mitteleuropäische Normalzeit)"
          )
        }
      ],
      doneNum: 2,
      interval: "shortterm",
      tags: "business"
    }
  ]

  function addDays(date, days) {
    let result = new Date(date)
    result.setDate(result.getDate() + days)
    return result
  }

  const initialFormState = {
    id: null,
    name: "",
    date: null,
    doneNum: 0,
    interval: "",
    tags: ""
  }

  function createReps(item) {
    let repsArray = item.reps.map(i => ({
      ...i,
      isDone: item.doneNum >= i.Nr ? true : false,
      date: addDays(item.date, i.distence)
    }))
    return repsArray
  }
  //Setting state
  //const [ users, setUsers ] = useState(usersData)

  const [items, setItems] = useState(initialLearnItems)
  const [currentItem, setCurrentItem] = useState(initialFormState)
  const [editing, setEditing] = useState(false)

  const addLearnItem = item => {
    //CRUD operations
    item.reps = createReps(item)
    item.id = items.length + 1
    setItems([...items, item])
    console.log(item)
  }

  const deleteItem = id => {
    setEditing(false)
    setItems(items.filter(item => item.id !== id))
  }

  const editRow = item => {
    setEditing(true)
    setCurrentItem(item)
  }

  const updateItem = (id, updatedItem) => {
    setEditing(false)
    updatedItem.reps = createReps(updatedItem)
    setItems(items.map(item => (item.id === id ? updatedItem : item)))
  }

  //could shorten this
  const setItemAsDone = id => {
    setEditing(false)
    let itemInProcess = items.find(item => item.id === id)
    itemInProcess.doneNum = Number(itemInProcess.doneNum) + 1
    itemInProcess.reps = createReps(itemInProcess)

    setItems(items.map(item => (item.id === id ? itemInProcess : item)))
  }

  //======================= Sorting Locic =========================lll

  function compareValues(key, order = "asc") {
    return function(a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        return 0
      }

      const varA = typeof a[key] === "string" ? a[key].toUpperCase() : a[key]
      const varB = typeof b[key] === "string" ? b[key].toUpperCase() : b[key]

      let comparison = 0
      if (varA > varB) {
        comparison = 1
      } else if (varA < varB) {
        comparison = -1
      }
      return order === "desc" ? comparison * -1 : comparison
    }
  }

  const [isAsc, setDirectionToggler] = useState(true)

  const sort = key => {
    //create direction variable
    let direction = isAsc ? "asc" : "desc"
    //change sorting
    let newOrder = items.sort(compareValues(key, direction))
    //toggle diricton
    setDirectionToggler(!isAsc)
    setItems(newOrder)
    console.log(key, direction, newOrder)
  }

  return (
    <Paper className={classes.backgroundPaper} elevation={0}>
      <AppBar position="static" className={classes.headAppBar}>
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            Repio - Spaced Repititon
          </Typography>
        </Toolbar>
      </AppBar>
      <Grid container justify="center" className={classes.pageContent}>
        <Grid item xs={11} md={10} lg={8}>
          {editing ? (
            <>
              <EditItemForm
                editing={editing}
                setEditing={setEditing}
                currentItem={currentItem}
                updateItem={updateItem}
              />
            </>
          ) : (
            <>
              <AddForm addLearnItem={addLearnItem} />
            </>
          )}
          <Paper className={classes.menuPaper}>
            <AppBar
              className={classes.appBar2}
              position="static"
              color="default"
            >
              <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
                aria-label="full width tabs example"
              >
                <Tab label="To Review" {...a11yProps(0)} />
                <Tab label="All" {...a11yProps(1)} />
                <Tab label="Settings" {...a11yProps(2)} />
              </Tabs>
            </AppBar>
            <SwipeableViews
              axis={theme.direction === "rtl" ? "x-reverse" : "x"}
              index={value}
              onChangeIndex={handleChangeIndex}
            >
              <TabPanel value={value} index={0} dir={theme.direction}>
                <ToReviewList
                  items={items}
                  setItemAsDone={setItemAsDone}
                  sort={sort}
                />
              </TabPanel>
              <TabPanel value={value} index={1} dir={theme.direction}>
                <AllList
                  items={items}
                  deleteItem={deleteItem}
                  editRow={editRow}
                  sort={sort}
                />
              </TabPanel>
              <TabPanel value={value} index={2} dir={theme.direction}>
                Item Three
              </TabPanel>
            </SwipeableViews>
          </Paper>
        </Grid>
      </Grid>
    </Paper>
  )
}
