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
    minWidth: 500
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
                onClick={() => props.sort("overDoDays")}
              >
                Overdo since
              </TableCell>
              <TableCell
                className={classes.headCell}
                onClick={() => props.sort("category")}
              >
                Category
              </TableCell>
              <TableCell className={classes.headCell}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.filteredItems.length > 0 ? (
              props.filteredItems.map(item => (
                <TableRow key={item.name}>
                  <TableCell component="th" scope="row">
                    {item.name}
                  </TableCell>
                  <TableCell>{item.overDoDays}</TableCell>
                  <TableCell>{item.category}</TableCell>
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
