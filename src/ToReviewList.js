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

  return (
    <>
      <Paper className={classes.root}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead className={classes.tableHeader}>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Review Dates</TableCell>
              <TableCell>next</TableCell>
              <TableCell>tags</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.items.map(item => (
              <TableRow key={item.name}>
                <TableCell component="th" scope="row">
                  {item.name}
                </TableCell>
                <TableCell>
                  {item.reviewDates
                    .map(i => i.toLocaleDateString("en-US"))
                    .join(", ")}
                </TableCell>
                <TableCell>
                  {new Date(item.nextToReview).toLocaleDateString("en-US")}
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
