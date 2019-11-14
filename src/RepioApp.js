import React, { useState } from "react"
import AllList from "./AllList"
import Form from "./Form"

import Typography from "@material-ui/core/Typography"
import Paper from "@material-ui/core/Paper"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Grid from "@material-ui/core/Grid"

import PropTypes from "prop-types"
import SwipeableViews from "react-swipeable-views"
import { makeStyles, useTheme } from "@material-ui/core/styles"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import Box from "@material-ui/core/Box"

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

export default function RepioApp() {
  const initialLearnItems = [
    {
      id: 1,
      name: "Zero to One",
      created: "22/10/19",
      next: "toBeComputed",
      interval: "longTerm",
      tags: "business"
    },
    {
      id: 1,
      name: "21 Lessons",
      created: "05/06/19",
      next: "toBeComputed",
      interval: "longTerm",
      tags: "culture"
    },
    {
      id: 1,
      name: "React Articles November",
      created: "10/10/19",
      next: "toBeComputed",
      interval: "longTerm",
      tags: "frontend library"
    }
  ]

  //======================  functions  ===========================//

  const [learnItems, setlearnItems] = useState(initialLearnItems)

  const addLearnItem = value => {
    setlearnItems([
      ...learnItems,
      {
        id: 1,
        name: value.name,
        created: value.date,
        next: "toBeComputed",
        interval: "test",
        tags: "business"
      }
    ])
    console.log(value)
  }

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
                {/*                 <ToReviewList learnItems={learnItems} />
                 */}{" "}
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
