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
import { motion } from "framer-motion";

function Home() {

    const navigate = useNavigate();
    const [data, setData] = useState([]);
    var animateTime = 0;

    useEffect(() => {
        axios
            .get(API)
            .then((response) => {
                setData(response.data);
                console.log(response.data);
                document.body.scrollTop = document.documentElement.scrollTop = 0
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

    const generateSample = async () => {
        try {
            document.getElementById('generate').innerText = "Loading..."
            await axios
                .post(API, {
                    "name": "Leah Spencer",
                    "price": "156.00",
                    "invoicedate": "2022-11-10T00:49:06.416Z",
                    "quantity": 3,
                    "email": "Leah.Spencer@yahoo.com",
                    "paymentdue": "2023-02-14T17:42:13.504Z",
                    "address1": "238 Waelchi Freeway",
                    "address2": "Farrellbury",
                    "address3": "Tonga",
                    "zipcode": "12340-9894",
                    "itemname": "Banner Design",
                    "status": "paid",
                })
            await axios
                .post(API, {
                    "name": "Christie Cole",
                    "price": "200.00",
                    "invoicedate": "2022-12-18T13:45:28.565Z",
                    "quantity": 2,
                    "email": "Christie_Cole@yahoo.com",
                    "paymentdue": "2023-09-05T08:21:42.598Z",
                    "address1": "25972 Little Brooks",
                    "address2": "Harberburgh",
                    "address3": "Malta",
                    "zipcode": "42583",
                    "itemname": "Email Design",
                    "status": "pending",
                })
            await axios
                .post(API, {
                    "name": "Lana Franecki",
                    "price": "1800.9",
                    "invoicedate": "2022-08-12T19:43:15.891Z",
                    "quantity": 1,
                    "email": "Lana.Franecki3@hotmail.com",
                    "paymentdue": "2023-04-15T18:07:27.495Z",
                    "address1": "9600 Cassin Course",
                    "address2": "East Timothy",
                    "address3": "Greece",
                    "zipcode": "90229-2598",
                    "itemname": "Brand Guidelines",
                    "status": "paid",
                })
            await axios
                .post(API, {
                    "name": "Dwight Wyman",
                    "price": "14002.33",
                    "invoicedate": "2022-09-21T11:13:25.614Z",
                    "quantity": 1,
                    "email": "Dwight.Wyman15@yahoo.com",
                    "paymentdue": "2023-05-17T13:59:05.606Z",
                    "address1": "01510 Collins Cape",
                    "address2": "Gibsonstad",
                    "address3": "New Caledonia",
                    "zipcode": "25879-8813",
                    "itemname": "Website Redesign",
                    "status": "paid",
                })
            await axios
                .post(API, {
                    "name": "Lydia Baumbach",
                    "price": "102.04",
                    "invoicedate": "2022-10-03T07:22:25.357Z",
                    "quantity": 2,
                    "email": "Lydia_Baumbach60@hotmail.com",
                    "paymentdue": "2023-11-15T22:17:59.319Z",
                    "address1": "28162 D'angelo Unions",
                    "address2": "East Rodburgh",
                    "address3": "Equatorial Guinea",
                    "zipcode": "17080",
                    "itemname": "Logo Sketches",
                    "status": "pending",
                })
            await axios
                .post(API, {
                    "name": "Rosa Abbott",
                    "price": "1532.33",
                    "invoicedate": "2022-07-16T00:49:34.916Z",
                    "quantity": 1,
                    "email": "Rosa.Abbott36@hotmail.com",
                    "paymentdue": "2023-08-17T15:29:18.490Z",
                    "address1": "06084 Kaden Estates",
                    "address2": "Leslyview",
                    "address3": "Croatia",
                    "zipcode": "12230",
                    "itemname": "New Logo",
                    "status": "paid",
                })
            await axios
                .post(API, {
                    "name": "Wilbert Mosciski",
                    "price": "3102.04",
                    "invoicedate": "2022-09-30T18:11:35.078Z",
                    "quantity": 1,
                    "email": "Wilbert.Mosciski@yahoo.com",
                    "paymentdue": "2023-07-30T19:22:21.514Z",
                    "address1": "677 Kovacek Drives",
                    "address2": "Emeliaboro",
                    "address3": "Jamaica",
                    "zipcode": "35206-1121",
                    "itemname": "Logo Re-design",
                    "status": "pending",
                })
            await axios
                .post(API, {
                    "name": "Floyd Harber",
                    "price": "6155.91",
                    "invoicedate": "2022-11-10T01:25:27.449Z",
                    "quantity": 2,
                    "email": "Garrett.Koepp95@hotmail.com",
                    "paymentdue": "2023-09-15T21:01:06.385Z",
                    "address1": "72648 Bartoletti Dam",
                    "address2": "Lake Selmer",
                    "address3": "Australia",
                    "zipcode": "28399-2128",
                    "itemname": "Web Design",
                    "status": "paid",
                })
            await axios
                .post(API, {
                    "name": "Shelly Huels",
                    "price": "2500.05",
                    "invoicedate": "2022-12-12T19:22:58.867Z",
                    "quantity": 1,
                    "email": "Shelly_Huels62@hotmail.com",
                    "paymentdue": "2023-01-02T22:06:11.022Z",
                    "address1": "1881 Pattie Neck",
                    "address2": "Mohammadstad",
                    "address3": "Cote d'Ivoire",
                    "zipcode": "74501-6578",
                    "itemname": "Brand Guidelines",
                    "status": "pending",
                })
            await axios
                .post(API, {
                    "name": "Toni Effertz",
                    "price": "24002.33",
                    "invoicedate": "2022-12-29T22:15:31.358Z",
                    "quantity": 1,
                    "email": "Toni.Effertz@hotmail.com",
                    "paymentdue": "2023-10-30T08:32:16.079Z",
                    "address1": "69259 Chelsey Mission",
                    "address2": "Jailyncester",
                    "address3": "Nauru",
                    "zipcode": "57509-2797",
                    "itemname": "App Design",
                    "status": "paid",
                })
                .then(() => {
                    AllData();
                })
        }
        catch (err) {
            console.log(err);
        }
    }

    if (!data) return (
        <Box sx={{ width: '100%' }}>
            <LinearProgress />
        </Box>
    )

    return (
        <div className='Home'>
            <nav className="navbar">
                <div className="navbar-brand fs-1"><b>Invoice</b></div>
                <button className='Add__Button' onClick={() => navigate('/create')}>
                    <AddCircleIcon /> Add Invoice
                </button>
            </nav>
            <div className='Total__Filter'>
                <p className='text-secondary m-0'>Invoices ({data.length})</p>
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
            {data.length !== 0 ?
                <div className='Home__Section'>
                    {[...data].reverse().map((ele) => {
                        animateTime = animateTime + 0.2
                        return (
                            <motion.div
                                initial={{ y: 100, opacity: 0, scale: 0.5 }}
                                animate={{ y: 0, opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: animateTime }}
                                key={ele.id} className='Home__Items' onClick={() => navigate(`/view/${ele.id}`)}
                            >
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
                            </motion.div>
                        )
                    })}
                </div>
                :
                <motion.button
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 3 }}
                    className='btn btn-dark' onClick={generateSample} id="generate">
                    Generate Sample Invoices
                </motion.button>
            }
        </div>
    );
}

export default Home;