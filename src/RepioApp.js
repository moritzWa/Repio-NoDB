import React, { useState } from "react"
import PropTypes from "prop-types"

import AllList from "./AllList"
import ToReviewList from './ToReviewList'
import Form from "./Form"

import SwipeableViews from "react-swipeable-views"

import {
  Typography,
  Paper,
  AppBar,
  Toolbar,
  Grid,
  Tabs,
  Tab,
  Box
} from "@material-ui/core/"
import { makeStyles, useTheme } from "@material-ui/core/styles"

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
  menuPaper: {
    margin: "6rem 1rem",
    backgroundColor: "white"
  },
  appBar2: {
    borderRadius: "5px 5px 0 0"
  },
  pageContent: {
    display: "flex"
  }
}))

//
//

export default function RepioApp() {
  const initialLearnItems = [
    {
      id: 1,
      name: "Zero to One",
      created: "12/10/2016",
      ReviewDates: JSON.stringify(nextDatesArray(new Date('12/10/2016'))),
      next: JSON.stringify(futureDateFunc(nextDatesArray(new Date('12/10/2016')))),
      interval: "longTerm",
      tags: "business"
    },
    {
      id: 1,
      name: "21 Lessons",
      created: "05/06/2018",
      ReviewDates: JSON.stringify(nextDatesArray(new Date("05/06/2018"))),
      next: JSON.stringify(futureDateFunc(nextDatesArray(new Date("05/06/2018")))),
      interval: "shortterm",
      tags: "culture"
    },
   
  ]

  //======================  Business Logic  ======================//
  console.log(initialLearnItems.next)  
  

  function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }
  
  function nextDatesArray(date) {
    const interval = [1, 7, 14, 28, 56, 112, 224, 448]
    
    let array = interval.map(i => addDays(date, i))
    return array
  }

  function futureDateFunc(reviewDates){
    //Get current time
    const now = Date.now()
    let futureDates = reviewDates.filter(date => {
      // Filter out dates in the past or falsey values
      return date && (new Date(date)).getTime() > now
    })
    return futureDates[0]
  }

  const [learnItems, setlearnItems] = useState(initialLearnItems)

  const addLearnItem = value => {

    let reviewDates = nextDatesArray(value.date)
    let nextToReview = futureDateFunc(reviewDates)

    setlearnItems([
      ...learnItems,
      {
        id: 1,
        name: value.name,
        created: value.date,
        ReviewDates: JSON.stringify(reviewDates),
        next: JSON.stringify(nextToReview),
        interval: value.interval,
        tags: "business"
      }
    ])
    console.log(reviewDates)
    console.log(nextToReview)
  }

 
  //======================  style Logic  ======================//

  const classes = useStyles()
  const theme = useTheme()

  const [value, setValue] = React.useState(0)
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  const handleChangeIndex = index => {
    setValue(index)
  }

  return (
    <Paper className={classes.backgroundPaper} elevation={0}>
      <AppBar position="primary" style={{ height: "64px" }}>
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            Repio - Spaced Repititon
          </Typography>
        </Toolbar>
      </AppBar>
      <Grid container justify="center" className={classes.pageContent}>
        <Grid item xs={11} md={10} lg={8}>
          <Form addLearnItem={addLearnItem} />
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
               <ToReviewList learnItems={learnItems} />
              </TabPanel>
              <TabPanel value={value} index={1} dir={theme.direction}>
                <AllList learnItems={learnItems} />
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
