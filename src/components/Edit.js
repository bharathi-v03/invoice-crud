import React, { useState, useEffect } from 'react';
import "../styles/Edit.css"
import axios from 'axios';
import { useParams, useNavigate } from "react-router-dom";
import { API } from '../api/api';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

function Edit() {

    const { id } = useParams();
    const navigate = useNavigate();
    const [dataExist, setDataExist] = useState(false);

    const [uid, setUid] = useState(null);
    const [name, setName] = useState(null);
    const [price, setPrice] = useState(null);
    const [invoicedate, setInvoiceDate] = useState(null);
    const [quantity, setQuantity] = useState(null);
    const [email, setEmail] = useState(null);
    const [paymentdue, setPaymentdue] = useState(null);
    const [address1, setAddress1] = useState(null);
    const [address2, setAddress2] = useState(null);
    const [address3, setAddress3] = useState(null);
    const [zipcode, setZipcode] = useState(null);
    const [itemname, setItemname] = useState(null);

    useEffect(() => {
        axios
            .get(`${API}/${id}`)
            .then((response) => {
                setUid(response.data.id);
                setName(response.data.name);
                setPrice(response.data.price);
                setInvoiceDate(response.data.invoicedate);
                setQuantity(response.data.quantity);
                setEmail(response.data.email);
                setPaymentdue(response.data.paymentdue);
                setAddress1(response.data.address1);
                setAddress2(response.data.address2);
                setAddress3(response.data.address3);
                setZipcode(response.data.zipcode)
                setItemname(response.data.itemname);
                setDataExist(true);
            });
    }, [id]);

    const UpdatePost = (e) => {
        axios
            .put(`${API}/${id}`, {
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
                itemname: itemname
            })
            .then(() => {
                navigate(-1);
            });
        e.preventDefault();
    }

    if (!dataExist) return (
        <Box sx={{ width: '100%' }}>
            <LinearProgress />
        </Box>
    )

    return (
        <div className='Edit'>
            <div
                style={{
                    backgroundColor: "white",
                    padding: "2rem",
                    borderRadius: "15px"
                }}
            >
                <Box
                    component="form"
                    onSubmit={UpdatePost}
                    autoComplete="off"
                >
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                InputProps={{
                                    readOnly: true,
                                }}
                                label="Invoice No"
                                defaultValue={uid}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                label="Client’s Name"
                                onChange={(e) => setName(e.target.value)}
                                defaultValue={name}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                type="email"
                                fullWidth
                                label="Client’s Email"
                                onChange={(e) => setEmail(e.target.value)}
                                defaultValue={email}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                label="Street Address"
                                onChange={(e) => setAddress1(e.target.value)}
                                defaultValue={address1}
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
                                defaultValue={address2}
                                sx={{
                                    flexGrow: 1
                                }}
                            />
                            <TextField
                                required
                                label="Post Code"
                                onChange={(e) => setZipcode(e.target.value)}
                                defaultValue={zipcode}
                                sx={{
                                    flexGrow: 1
                                }}
                            />
                            <TextField
                                required
                                label="Country"
                                onChange={(e) => setAddress3(e.target.value)}
                                defaultValue={address3}
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
                                defaultValue={itemname}
                                sx={{
                                    flexGrow: 1
                                }}
                            />
                            <TextField
                                required
                                type="number"
                                label="QTY."
                                onChange={(e) => setQuantity(e.target.value)}
                                defaultValue={quantity}
                                sx={{
                                    flexGrow: 1
                                }}
                            />
                            <TextField
                                required
                                inputProps={{ pattern: '[0-9]+([.][0-9]+)?' }}
                                label="Price"
                                onChange={(e) => setPrice(e.target.value)}
                                defaultValue={price}
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
                    <button type='submit' className='Save__Button ms-3' style={{ float: "right" }}>Save Changes</button>
                </Box >
                <button className='Discard__Button' onClick={() => navigate(-1)}>Cancel</button>
            </div >
        </div>
    );
}

export default Edit;