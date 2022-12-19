import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { API } from '../api/api';
import "../styles/Home.css";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import moment from 'moment';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

function Home() {

    const navigate = useNavigate();
    const [data, setData] = useState([]);

    useEffect(() => {
        axios
            .get(API)
            .then((response) => {
                setData(response.data);
                console.log(response.data);
            })
    }, []);

    const AllData = () => {
        axios
            .get(API)
            .then((response) => {
                setData(response.data);
                console.log(response.data);
            })
    }

    const PaidData = () => {
        axios
            .get(`${API}/?status=paid`)
            .then((response) => {
                setData(response.data);
                console.log(response.data);
            })
    }

    const PendingData = () => {
        axios
            .get(`${API}/?status=pending`)
            .then((response) => {
                setData(response.data);
                console.log(response.data);
            })
    }

    if (!data) return (
        <Box sx={{ width: '100%' }}>
            <LinearProgress />
        </Box>
    )

    return (
        data.length !== 0 ?
            <div className='Home'>
                <nav className="navbar">
                    <div className="navbar-brand fs-1"><b>Invoice</b></div>
                    <button className='Add__Button' onClick={() => navigate('/create')}>
                        <AddCircleIcon /> Add Invoice
                    </button>
                </nav>
                <div className='Total__Filter'>
                    <p className='text-secondary Length'>There are {data.length} total invoices</p>
                    <TextField
                        select
                        label="Filter By"
                        defaultValue={`all`}
                        size="small"
                        sx={{
                            width: "10rem",
                        }}
                    >
                        <MenuItem value="all" onClick={AllData}>
                            All
                        </MenuItem>
                        <MenuItem value="paid" onClick={PaidData}>
                            Paid
                        </MenuItem>
                        <MenuItem value="pending" onClick={PendingData}>
                            Pending
                        </MenuItem>
                    </TextField>
                </div>
                <div className='Home__Section'>
                    {[...data].reverse().map((ele) => {
                        return (
                            <div key={ele.id} className='Home__Items' onClick={() => navigate(`/view/${ele.id}`)}>
                                <div className='Home__Subitems'>
                                    <p className='Col_1'>Invoice:<span className="text-secondary">#</span>{ele.id}</p>
                                    <p className="Col_2 text-secondary">{moment(ele.invoicedate).format('L')}</p>
                                    <p className="Col_3 text-secondary">{ele.name}</p>
                                </div>
                                <div className='Home__Subitems2'>
                                    <p className='Col_4 me-2'>₹{(ele.quantity * ele.price).toFixed(2)}</p>
                                    <div className='Col_5'>
                                        {ele.status === "paid" ?
                                            <p className="Home_Col_2 p-3 pt-2 pb-2">
                                                <FiberManualRecordIcon
                                                    sx={{
                                                        fontSize: 10,
                                                        marginRight: 0.5
                                                    }}
                                                />
                                                {ele.status}
                                            </p>
                                            :
                                            <span />
                                        }
                                        {ele.status === "pending" ?
                                            <p className="Home_Col_2_Pending p-3 pt-2 pb-2">
                                                <FiberManualRecordIcon
                                                    sx={{
                                                        fontSize: 10,
                                                        marginRight: 0.5
                                                    }}
                                                />
                                                {ele.status}
                                            </p>
                                            :
                                            <span />
                                        }
                                        <ArrowForwardIosIcon
                                            sx={{
                                                fontSize: 10,
                                                color: "rgb(137, 29, 252)"
                                            }}
                                            className="ArrowForwardIosIcon"
                                        />
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div> :
            <Box sx={{ width: '100%' }}>
                <LinearProgress />
            </Box>
    );
}

export default Home;