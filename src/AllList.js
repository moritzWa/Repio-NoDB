import React from "react"
import { withStyles, makeStyles } from "@material-ui/core/styles"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"

import EditIcon from "@material-ui/icons/Edit"

const useStyles = makeStyles({
  root: {
    width: "100%",
    overflowX: "auto"
  },
  table: {
    minWidth: 650
  }
})

export default function AllList(props) {
  const classes = useStyles()

  function edit(event) {
    props.editAppLevel(event)
  }

  return (
    <>
      <Paper className={classes.root}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead className={classes.tableHeader}>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>created</TableCell>
              <TableCell>learnDates</TableCell>
              {/* temp */}
              <TableCell>next</TableCell>
              <TableCell>Revies Done</TableCell>
              <TableCell>interval</TableCell>
              <TableCell>tags</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.learnItems.map(item => (
              <TableRow key={item.name} id={item.name}>
                <TableCell component="th" scope="row">
                  {item.name}
                </TableCell>
                <TableCell>{item.created}</TableCell>
                <TableCell>{item.ReviewDates}</TableCell>
                {/* temp */}
                <TableCell>{item.next}</TableCell>
                <TableCell>{item.doneNum}/10</TableCell>
                <TableCell>{item.interval}</TableCell>
                <TableCell>{item.tags}</TableCell>
                <TableCell>
                  <EditIcon onClick={() => edit(item.name)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </>
  )
}
