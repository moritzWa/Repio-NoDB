import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import IconButton from "@material-ui/core/IconButton"

import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"

import EditIcon from "@material-ui/icons/Edit"
import DeleteIcon from "@material-ui/icons/Delete"

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

  return (
    <>
      <Paper className={classes.root}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead className={classes.tableHeader}>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>created</TableCell>
              <TableCell>learnDates</TableCell>
              <TableCell>next</TableCell>
              <TableCell>Reviews Done</TableCell>
              <TableCell>interval</TableCell>
              <TableCell>tags</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.items.map(item => (
              <TableRow key={item.name} id={item.name}>
                <TableCell component="th" scope="row">
                  {item.name}
                </TableCell>
                <TableCell>
                  {new Date(item.date).toLocaleDateString("en-US")}
                </TableCell>
                <TableCell>test</TableCell>
                <TableCell>test</TableCell>
                <TableCell>{item.doneNum}/10</TableCell>
                <TableCell>{item.interval}</TableCell>
                <TableCell>{item.tags}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => {
                      props.editRow(item)
                    }}
                    color="primary"
                    className={classes.button}
                    aria-label="Edit Item"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => props.deleteItem(item.id)}
                    color="primary"
                    className={classes.button}
                    aria-label="Delete item"
                  >
                    <DeleteIcon />
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
