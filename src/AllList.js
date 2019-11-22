import React, { useState, useEffect } from "react"
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

import ExpansionPanel from "@material-ui/core/ExpansionPanel"
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"

const useStyles = makeStyles({
  root: {
    width: "100%",
    overflowX: "auto"
  },
  table: {
    minWidth: 650
  },
  expansion: {
    border: "none",
    boxShadow: "none"
  },
  headCell: {
    "&:hover": {
      color: "grey",
      cursor: "pointer",
      transitionDuration: ".3s"
    }
  }
})

export default function AllList(props) {
  const classes = useStyles()
  const [items, setItems] = useState(props.items)

  useEffect(() => {
    setItems(props.items)
  }, [props])

  //bug page loads only after seccond click, tab change, additem()
  //...  not when clicking sortfunnc or editing

  return (
    <>
      <Paper className={classes.root}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead className={classes.tableHeader}>
            <TableRow>
              <TableCell
                className={classes.headCell}
                onClick={() => props.sort("name")}
              >
                Name
              </TableCell>
              <TableCell
                className={classes.headCell}
                onClick={() => props.sort("date")}
              >
                Created
              </TableCell>
              <TableCell
                className={classes.headCell}
                onClick={() => props.sort("doneNum")}
              >
                Reviews
              </TableCell>
              <TableCell
                className={classes.headCell}
                onClick={() => props.sort("interval")}
              >
                Interval
              </TableCell>
              <TableCell
                className={classes.headCell}
                onClick={() => props.sort("category")}
              >
                Category
              </TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map(item => (
              <TableRow key={item.name} id={item.name}>
                <TableCell component="th" scope="row">
                  {item.name}
                </TableCell>
                <TableCell>
                  {new Date(item.date).toLocaleDateString("en-US")}
                </TableCell>
                <TableCell>
                  <ExpansionPanel className={classes.expansion}>
                    <ExpansionPanelSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      {item.doneNum}/10
                    </ExpansionPanelSummary>

                    <ol>
                      {item.reps.map(i => (
                        <li>{new Date(i.date).toLocaleDateString("en-US")}</li>
                      ))}
                    </ol>
                  </ExpansionPanel>
                </TableCell>
                <TableCell>{item.interval}</TableCell>
                <TableCell>{item.category}</TableCell>
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
