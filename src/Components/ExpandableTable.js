import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { getAddress, getBrandNames, getPrice } from '../Services/Utility';
import { getRequest } from '../Services/networkRequests';

function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const [order, setOrder] = React.useState({})

    React.useEffect(() => {
        if (row.id && open) {
            async function fetchOrder() {
                console.log('row da useefect')
                const _order = await getRequest(`order-detail/${row.id}`)
                setOrder(_order)
            }
            fetchOrder()
        }
    }, [open])
    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.uuid}
                </TableCell>
                <TableCell align="left">{getBrandNames(row.brands)}</TableCell>
                <TableCell align="left">${getPrice(row.totalAmount)}</TableCell>
                <TableCell align="left">{row.status}</TableCell>
                <TableCell align="left">{row.stripeStatus}</TableCell>
                <TableCell align="left">{row.createdAt}</TableCell>
                <TableCell align="left">{props.cols[props.cols.length - 1].renderCell(row)}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Details
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Address</TableCell>
                                        <TableCell>Products</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {order.hasOwnProperty("id") && (
                                        <TableRow key={order.id}>
                                            <TableCell component="th" scope="row">
                                                {getAddress(order.address)}
                                            </TableCell>
                                            <TableCell>
                                                {order.prods.map(orderItem => (
                                                    <>
                                                        <div>Brand: {orderItem.brand}</div>
                                                        <div>paymentMethod: {orderItem.paymentMethod.name}</div>
                                                        <div>shippingMethod: {orderItem.shippingMethod?.time}</div>
                                                        <div>tax: {orderItem.tax}</div>
                                                        <div>Cost: {orderItem.totalCost}</div>
                                                        <div>Products:</div>
                                                        <div>
                                                            {orderItem.variations.map(varItem => (
                                                                varItem.title
                                                            ))}
                                                        </div>
                                                        <p> </p>
                                                    </>
                                                ))}
                                            </TableCell>
                                        </TableRow>
                                    )}
                                    {/* {row.history.map((historyRow) => (
                                        <TableRow key={historyRow.date}>
                                            <TableCell component="th" scope="row">
                                                {historyRow.date}
                                            </TableCell>
                                            <TableCell>{historyRow.customerId}</TableCell>
                                            <TableCell align="right">{historyRow.amount}</TableCell>
                                            <TableCell align="right">
                                                {Math.round(historyRow.amount * row.price * 100) / 100}
                                            </TableCell>
                                        </TableRow>
                                    ))} */}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

export default function ExpandableTable(props) {
    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        {props.cols.map(coloumn => (
                            <TableCell key={coloumn.field}>{coloumn.headerName}</TableCell>
                        ))}
                        {/* <TableCell>Dessert (100g serving)</TableCell>
                        <TableCell align="right">Calories</TableCell>
                        <TableCell align="right">Fat&nbsp;(g)</TableCell>
                        <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                        <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.tableData.map((row) => (
                        <Row row={row} cols={props.cols} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
