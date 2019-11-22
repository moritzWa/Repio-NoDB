import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import CheckIcon from "@material-ui/icons/Check"
import IconButton from "@material-ui/core/IconButton"

import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"

const useStyles = makeStyles({
  root: {
    width: "100%",
    overflowX: "auto"
  },
  table: {
    minWidth: 650
  },
  doneText: {
    margin: "2rem",
    textAlign: "center"
  },
  headCell: {
    "&:hover": {
      color: "grey",
      cursor: "pointer",
      transitionDuration: ".3s"
    }
  }
})

export default function ToReviewList(props) {
  const classes = useStyles()

  //finnd item that has overdo reps
  const filterOverDoItems = array => {
    let arr = []
    array.forEach(element => {
      element.reps.forEach(rep => {
        if (!rep.isDone && rep.date < new Date() && !arr.includes(element)) {
          arr.push(element)
        }
      })
    })
    return arr //returns items
  }

  //get distence of overdo rep from filteredItem
  const getOverDoDays = filteredItem => {
    let DistenceForOneItem = filteredItem.reps.filter(rep => {
      if (!rep.isDone && rep.date < new Date()) {
        return rep
      }
    })
    let NumOfDays = Math.floor(
      (DistenceForOneItem[0].date - new Date()) / (1000 * 3600 * 24) + 1
    )
    return NumOfDays
  }

  let filteredItems = filterOverDoItems(props.items)

  return (
    <>
      <Paper className={classes.root}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell
                className={classes.headCell}
                onClick={() => props.sort("name")}
              >
                Name
              </TableCell>
              <TableCell
                className={classes.headCell}
                onClick={() => props.sort("name")}
              >
                Last Repio
              </TableCell>
              <TableCell
                className={classes.headCell}
                onClick={() => props.sort("name")}
              >
                Overdo since
              </TableCell>
              <TableCell
                className={classes.headCell}
                onClick={() => props.sort("name")}
              >
                Tags
              </TableCell>
              <TableCell
                className={classes.headCell}
                onClick={() => props.sort("name")}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredItems.length > 0 ? (
              filteredItems.map(item => (
                <TableRow key={item.name}>
                  <TableCell component="th" scope="row">
                    {item.name}
                  </TableCell>
                  <TableCell>
                    {new Date(item.date).toLocaleDateString("en-US")}
                  </TableCell>
                  <TableCell>{getOverDoDays(item)}</TableCell>
                  <TableCell>{item.tags}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => props.setItemAsDone(item.id)}
                      color="primary"
                      className={classes.button}
                      aria-label="Review done"
                    >
                      <CheckIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <Typography className={classes.doneText}>
                  You dont have any repios left. Nice.
                </Typography>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>
    </>
  )
}
