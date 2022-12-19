import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { API } from '../api/api';
import "../styles/Create.css";
import Box from '@mui/material/Box';
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { motion } from "framer-motion";

function Create() {

    const navigate = useNavigate();

    const [name, setName] = useState(null);
    const [price, setPrice] = useState(null);
    const [invoicedate, setInvoiceDate] = useState(new Date());
    const [quantity, setQuantity] = useState(null);
    const [email, setEmail] = useState(null);
    const [paymentdue, setPaymentdue] = useState(new Date());
    const [address1, setAddress1] = useState(null);
    const [address2, setAddress2] = useState(null);
    const [address3, setAddress3] = useState(null);
    const [zipcode, setZipcode] = useState(null);
    const [itemname, setItemname] = useState(null);

    const CreatePost = (e) => {
        axios
            .post(API, {
                name: name,
                price: parseFloat(price).toFixed(2),
                invoicedate: invoicedate,
                quantity: Number(quantity),
                email: email,
                paymentdue: paymentdue,
                address1: address1,
                address2: address2,
                address3: address3,
                zipcode: zipcode,
                itemname: itemname,
                status: "pending"
            })
            .then(() => {
                navigate('/');
            });
        e.preventDefault();
    }

    return (
        <div className='Edit'>
            <motion.div
                initial={{ y: 100, opacity: 0, scale: 0.5 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.2 }}
                style={{
                    backgroundColor: "white",
                    padding: "2rem",
                    borderRadius: "15px",
                    boxShadow: "0px 3px 5px 0px rgba(128, 128, 128, 0.078)"
                }}
            >
                <Box
                    component="form"
                    onSubmit={CreatePost}
                    autoComplete="off"
                >
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                label="Client’s Name"
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                type="email"
                                fullWidth
                                label="Client’s Email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                label="Street Address"
                                onChange={(e) => setAddress1(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                columnGap: "1.5rem",
                                rowGap: "1.5rem",
                                flexWrap: "wrap"
                            }}
                        >
                            <TextField
                                required
                                label="City"
                                onChange={(e) => setAddress2(e.target.value)}
                                sx={{
                                    flexGrow: 1
                                }}
                            />
                            <TextField
                                required
                                label="Post Code"
                                onChange={(e) => setZipcode(e.target.value)}
                                sx={{
                                    flexGrow: 1
                                }}
                            />
                            <TextField
                                required
                                label="Country"
                                onChange={(e) => setAddress3(e.target.value)}
                                sx={{
                                    flexGrow: 1
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                columnGap: "1.5rem",
                                rowGap: "1.5rem",
                                flexWrap: "wrap"
                            }}
                        >
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DesktopDatePicker
                                    label="Invoice Date"
                                    value={invoicedate}
                                    minDate={dayjs('2017-01-01')}
                                    onChange={(newValue) => {
                                        setInvoiceDate(newValue);
                                    }}
                                    onAccept={(e) => setInvoiceDate(e.target.value)}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DesktopDatePicker
                                    label="Payment Due"
                                    value={paymentdue}
                                    minDate={dayjs(invoicedate)}
                                    onChange={(newValue) => {
                                        setPaymentdue(newValue);
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={12}
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                columnGap: "1.5rem",
                                rowGap: "1.5rem",
                                flexWrap: "wrap"
                            }}
                        >
                            <TextField
                                required
                                label="Item Name"
                                onChange={(e) => setItemname(e.target.value)}
                                sx={{
                                    flexGrow: 1
                                }}
                            />
                            <TextField
                                required
                                type="number"
                                label="QTY."
                                onChange={(e) => setQuantity(e.target.value)}
                                sx={{
                                    flexGrow: 1
                                }}
                            />
                            <TextField
                                required
                                inputProps={{ pattern: '[0-9]+([.][0-9]+)?' }}
                                label="Price"
                                onChange={(e) => setPrice(e.target.value)}
                                sx={{
                                    flexGrow: 1
                                }}
                            />
                            <TextField
                                label="Total"
                                InputProps={{
                                    readOnly: true,
                                }}
                                value={(quantity * price).toFixed(2)}
                                sx={{
                                    flexGrow: 1
                                }}
                            />
                        </Grid>
                    </Grid>
                    <button type='submit' className='Save__Button ms-3' style={{ float: "right" }}>Save & Send</button>
                </Box >
                <button className='Discard__Button' onClick={() => navigate(-1)}>Discard</button>
            </motion.div>
        </div>
    );
}

export default Create;