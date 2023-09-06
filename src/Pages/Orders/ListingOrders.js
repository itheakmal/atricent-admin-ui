import React, { useEffect, useState } from 'react'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Tooltip from '@mui/material/Tooltip';
import AddIcon from '@mui/icons-material/Add';
import Tables from '../../Components/Tables'
import { deleteRequest, getRequest } from '../../Services/networkRequests'
import { useNavigate } from 'react-router-dom';
import { getAddress, getBrandNames } from '../../Services/Utility';
import PopUp from '../../Components/PopUp';
import ExpandableTable from '../../Components/ExpandableTable';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';


export const ListingOrders = () => {
    const navigate = useNavigate();
    const [cars, setCars] = useState([])
    const [errorOrders, setErrorOrders] = useState([])
    const [realOrders, setRealOrders] = useState([])
    const [row, setRow] = useState({})
    const [openError, setOpenError] = useState(false);
    const [openPopUp, setOpenPopUp] = useState(false);
    const titleStyle = { padding: '20px', width: '100%', margin: "0" }

    useEffect(() => {
        async function fetchOrders() {
            const _orders = await getRequest('orders')
            const onlyOrder = _orders.filter(item => ['received', 'shiped', 'confirmed', 'delivered'].includes(item.status))
            const errorOrder = _orders.filter(item => !['received', 'shiped', 'confirmed', 'delivered'].includes(item.status))
            setCars(onlyOrder)
            setRealOrders(onlyOrder)
            setErrorOrders(errorOrder)
        }
        fetchOrders()
    }, [])
    const refreshOrders = async () => {
        const _orders = await getRequest('orders');
        const onlyOrder = _orders.filter(item => ['received', 'shiped', 'confirmed', 'delivered'].includes(item.status))
        const errorOrder = _orders.filter(item => !['received', 'shiped', 'confirmed', 'delivered'].includes(item.status))
        setCars(onlyOrder)
        setRealOrders(onlyOrder)
        setErrorOrders(errorOrder)
    };
    // data to pass to table component
    const handlePreview = (row) => {
        console.log('row', row)
        setRow(row)
        setOpenPopUp(true)
        // return navigate("/add-car/" + arg.id, { replace: true })
    }
    const handleDelete = async (arg) => {
        try {
            await deleteRequest(`/car/${arg.id}`);
            refreshOrders();
        } catch (error) {
            console.error("deleteCar error:", error);
            throw error;
        }
    };
    const handleAddNew = (arg) => console.log(arg)
    const filterError = () => {
        if (openError) {
            setCars(realOrders)
            setOpenError(false)
        } else {
            setCars(errorOrders)
            setOpenError(true)
        }
    }
    const columns = [
        { field: 'uuid', headerName: 'uuid', width: 200 },
        {
            field: 'brands', headerName: 'Brands', width: 200,
            renderCell: (params) => {
                const names = getBrandNames(params.row.brands)
                return (
                    <div>{names}</div>
                )
            }
        },
        { field: 'totalAmount', headerName: 'Amount', width: 200 },
        { field: 'status', headerName: 'Status', width: 200 },
        { field: 'stripeStatus', headerName: 'stripeStatus', width: 200 },
        { field: 'createdAt', headerName: 'Date', width: 200, },
        // {
        //     field: 'address', headerName: 'Address', width: 200,
        //     renderCell: (params) => {
        //         const address = getAddress(params)
        //         return(
        //             <div>{address}</div>
        //         )
        //     }
        // },
        {
            field: "actions",
            flex: 1,
            minWidth: 80,
            maxWidth: 200,
            align: 'right',
            headerName: "Actions",
            headerClassName: "grid-header-custom",
            headerAlign: "center",
            editable: false,
            renderCell: (params) => {
                return (
                    <Box display={"flex"} justifyContent="space-around" width={"100%"}>
                        <Tooltip title="Edit" placement="left-start">
                            <IconButton
                                // onClick={() => handlePreview(params.row)}
                                onClick={() => handlePreview(params)}
                                sx={{ boxShadow: "0px 0px 10px rgba(37, 133, 202, 0.2)" }}
                            >
                                <DriveFileRenameOutlineIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete" placement="right-start">
                            <IconButton
                                // onClick={() => handleDelete(params)}
                                sx={{ boxShadow: "0px 0px 10px rgba(37, 133, 202, 0.2)" }}
                            >
                                <DeleteOutlineIcon color="error" />
                            </IconButton>
                        </Tooltip>
                    </Box>
                );
            },
        },
    ];


    return (
        <div>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <Box component={'div'} justifyContent={'center'} alignItems={'center'} display={'flex'} maxWidth={'400px'}>
                    <h3 style={titleStyle}>Orders</h3>
                    <Tooltip title="Filter Error Orders" placement="left-start">
                        <IconButton
                            onClick={() => filterError()}
                            sx={{ boxShadow: "0px 0px 10px rgba(37, 133, 202, 0.2)" }}
                        >
                            {openError ? <FormatListBulletedIcon /> : <ErrorOutlineIcon />}
                        </IconButton>
                    </Tooltip>
                </Box>
                {/* <Tables tableTitle={'Orders Listing'} tableData={cars} cols={columns} /> */}
                <ExpandableTable tableData={cars} cols={columns} />
                <PopUp openPopUp={openPopUp} setOpenPopUp={setOpenPopUp} row={row} refreshOrders={refreshOrders} />
            </Paper>
        </div>
    )



}