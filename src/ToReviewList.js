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

const useStyles = makeStyles({
  root: {
    width: "100%",
    overflowX: "auto"
  },
  table: {
    minWidth: 650
  }
})

export default function ToReviewList(props) {
  const classes = useStyles()

  //look for overdo reps in obj
  const filterOverDoRepsInOpj = item => {
    let overdoReps = item.reps.filter(
      rep => !rep.isDone && rep.date < new Date()
    )
    return overdoReps //returns reps
  }

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

  let test = filterOverDoItems(props.items)
  console.log(test)

  //OverDo Distence
  //display DISTENCE of last overdo rep from one overdo item
  let DistenceForOneItem = test[0].reps.filter(rep => {if(rep.isDone || rep.date < new Date()){ return rep}})
  console.log((DistenceForOneItem.slice(-1)[0].date - new Date()) / (1000 * 3600 * 24))

 


  return (
    <>
      <Paper className={classes.root}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead className={classes.tableHeader}>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Review Dates</TableCell>
              <TableCell>Overdo since</TableCell>
              <TableCell>tags</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filterOverDoItems(props.items).map(item => (
              <TableRow key={item.name}>
                <TableCell component="th" scope="row">
                  {item.name}
                </TableCell>
                <TableCell>
                  {new Date(item.date).toLocaleDateString("en-US")}
                </TableCell>
                <TableCell>
                  test
                </TableCell>
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
            ))}
          </TableBody>
        </Table>
      </Paper>
    </>
  )
}
