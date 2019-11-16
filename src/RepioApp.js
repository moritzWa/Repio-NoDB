import React, { useState } from "react"
import PropTypes from "prop-types"

import AllList from "./AllList"
import ToReviewList from "./ToReviewList"
import Form from "./Form"
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
      name: "Zero to One",
      date: new Date("12/10/2016").toLocaleDateString("en-US"),
      reviewDates: nextDatesArray(new Date("12/10/2016")),
      nextToReview: futureDateFunc(nextDatesArray(new Date("12/10/2016"))),
      doneNum: 10,
      interval: "longTerm",
      tags: "business"
    },
    {
      id: 1,
      name: "21 Lessons",
      date: new Date("05/06/2018").toLocaleDateString("en-US"),
      reviewDates: nextDatesArray(new Date("05/06/2018")),
      nextToReview: futureDateFunc(nextDatesArray(new Date("05/06/2018"))),
      doneNum: 5,
      interval: "shortterm",
      tags: "culture"
    }
  ]

  function addDays(date, days) {
    var result = new Date(date)
    result.setDate(result.getDate() + days)
    return result
  }

  function nextDatesArray(date) {
    const interval = [1, 7, 14, 28, 56, 112, 224, 448]

    let array = interval.map(i => addDays(date, i))
    return array
  }

  function futureDateFunc(reviewDates) {
    //Get current time
    const now = Date.now()
    let futureDates = reviewDates.filter(date => {
      // Filter out dates in the past or falsey values
      return date && new Date(date).getTime() > now
    })
    return futureDates[0] ? futureDates[0] : "finish" //could be shortened
  }

  //==================== new Logic ==================//

  const initialFormState = {
    id: null,
    name: "",
    date: null,
    doneNum: 0,
    interval: "",
    tags: ""
  }

  //Setting state
  //const [ users, setUsers ] = useState(usersData)

  const [items, setItems] = useState(initialLearnItems)
  const [currentItem, setCurrentItem] = useState(initialFormState)
  const [editing, setEditing] = useState(false)

  //CRUD operations
  const addLearnItem = item => {
    item.reviewDates = nextDatesArray(item.date)
    item.nextToReview = futureDateFunc(item.reviewDates)
    item.id = items.length + 1

    setItems([...items, item])
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
    setItems(items.map(item => (item.id === id ? updatedItem : item)))
  }

  /* function findItem(event) {
    var toBeChangedItem = learnItems.find(i => event === i.name)
    console.log(toBeChangedItem)
    setToBeChangedItem(toBeChangedItem)
  } */

  /* function editItem(event) {
    console.log(event)
    findItem(event)
  } */

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
              <Form addLearnItem={addLearnItem} />
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
                <ToReviewList items={items} />
              </TabPanel>
              <TabPanel value={value} index={1} dir={theme.direction}>
                <AllList
                  items={items}
                  deleteItem={deleteItem}
                  editRow={editRow}
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
