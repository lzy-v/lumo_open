/**
 *
 * @Package: StakerTableView
 * @Date   : Dec 26th, 2021
 * @Author : Xiao Ling   
 * @Docs: https://codesandbox.io/s/material-ui-table-row-height-demo-64le3?file=/demo.js
 *
 *
**/



import React from "react";
import { withStyles, makeStyles, createStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { COLORS } from './constants';

const useStyles = (width,height) => makeStyles((theme: Theme) => createStyles({
	table: {
		width: width,
		height: height,
	},
	tableRow: {

		paddingLeft: '2px',
	},
	tableCell: {
		padding: "0px 10px",
	}
}));


const StyledTableRow = withStyles((theme) => ({
  root: {
	height: 30,
  }
}))(TableRow);

const StyledTableCell = withStyles((theme) => ({
	root: {
		padding: "0px 2px",
		color: 'white',
		filter: `brightness(0.75)`,        
		fontSize: `10px`,
		fontFamily: 'NeueMachina-Ultralight',		
		borderBottom  : `2px solid ${COLORS.translucent}`,        
	}
}))(TableCell);


const rows = [
    { 'key': 'origin', 'address': '0x5957fe1...4997'},
    { 'key': '3DArtist', 'address': '0x5957fe1...4997'},
    { 'key': 'Motion', 'address': '0x5957fe1...4997'},
    { 'key': 'Audio', 'address': '0x5957fe1...4997'},
    { 'key': 'Sketch', 'address': '0x5957fe1...4997'},
];    

export default function BasicTable(props) {

	const { width, height } = props;
	const classes = useStyles(width,height)();

	return (
		<>
		  <TableContainer component={Paper} style={{background:COLORS.transparent}} >
			<Table className={classes.table} aria-label="simple table" >
			  <TableBody>
				{rows.map((row) => (
				  <StyledTableRow key={row.key}>
					<StyledTableCell component="th" scope="row">
					  {row.key}
					</StyledTableCell>
					<StyledTableCell align="left">{row.address}</StyledTableCell>
				  </StyledTableRow>
				))}
			  </TableBody>
			</Table>
		  </TableContainer>
		</>
	);
}
