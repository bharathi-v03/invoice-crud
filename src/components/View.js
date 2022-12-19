import React, { useState, useEffect } from 'react';
import "../styles/View.css";
import axios from 'axios';
import { useParams, useNavigate } from "react-router-dom";
import { API } from '../api/api';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import moment from 'moment';
import { motion } from "framer-motion";

function View() {

    const { id } = useParams();
    const navigate = useNavigate();
    const [invoice, setInvoice] = useState(null);
    const [paid, setPaid] = useState("");

    useEffect(() => {
        axios
            .get(`${API}/${id}`)
            .then((response) => {
                setInvoice(response.data);
                setPaid(response.data.status);
                if (response.data.status === "paid") {
                    document.getElementById("markAsPaid").disabled = true;
                    document.getElementById("markAsPaid").style.pointerEvents = "none";
                    document.getElementById("markAsPaid").style.backgroundColor = "rgba(128, 128, 128, 0.327)";
                }
                document.body.scrollTop = document.documentElement.scrollTop = 0
            });
    }, [id]);

    const DeletePost = () => {
        axios
            .delete(`${API}/${id}`)
            .then(() => {
                navigate('/');
            });
    }

    const UpdatePaid = () => {
        axios
            .put(`${API}/${id}`, {
                status: "paid"
            })
            .then(() => {
                setPaid("paid");
                document.getElementById("markAsPaid").disabled = true;
                document.getElementById("markAsPaid").style.pointerEvents = "none";
                document.getElementById("markAsPaid").style.backgroundColor = "rgba(128, 128, 128, 0.327)";
            })
    }

    if (!invoice) return (
        <Box sx={{ width: '100%' }}>
            <LinearProgress />
        </Box>
    )

    return (
        <div className='View'>
            <p className='Go__Back' onClick={() => navigate(-1)}>
                <ArrowBackIosIcon
                    sx={{
                        color: "rgb(137, 29, 252)",
                        fontSize: 10,
                        stroke: "rgb(137, 29, 252)",
                        strokeWidth: 2,
                        verticalAlign: "0.2px"
                    }}
                />
                Go back
            </p>
            <motion.div
                initial={{ y: 100, opacity: 0, scale: 0.5 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.2 }}
                className='View__Items'
            >
                <div className='View__Subitems'>
                    <p className='View_Col_1 text-secondary'>Status</p>
                    {paid === "paid" ?
                        <p className="View_Col_2">
                            <FiberManualRecordIcon
                                sx={{
                                    fontSize: 10,
                                    marginRight: 1
                                }}
                            />
                            {paid}
                        </p>
                        :
                        <></>
                    }
                    {paid === "pending" ?
                        <p className="View_Col_2_Pending">
                            <FiberManualRecordIcon
                                sx={{
                                    fontSize: 10,
                                    marginRight: 1
                                }}
                            />
                            {paid}
                        </p>
                        :
                        <></>
                    }
                </div>
                <div className='View__Subitems2'>
                    <p className='View_Col_3'><button onClick={() => navigate(`/edit/${invoice.id}`)}>Edit</button></p>
                    <p className='View_Col_4'><button className='btn btn-danger' onClick={DeletePost}>Delete</button></p>
                    <p className='View_Col_5'>
                        <button className='Paid' onClick={UpdatePaid} id='markAsPaid'>
                            Mark as Paid
                        </button>
                    </p>
                </div>
            </motion.div>
            <motion.div
                initial={{ y: 100, opacity: 0, scale: 0.5 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className='View__Invoice'
            >
                <div className='View__Row1'>
                    <div className='fs-5'><b>Invoice:<span className="text-secondary">#</span>{invoice.id}</b></div>
                    <div className='text-secondary'>
                        <p>106 Kendell Street,</p>
                        <p>Sharrington,</p>
                        <p>NR24 5WQ,</p>
                        <p>United Kingdom</p>
                    </div>
                </div>
                <div className='View__Row2'>
                    <div className='View__Dates'>
                        <div>
                            <p className='text-secondary'>Invoice Date</p>
                            <p className='fs-5'><b>{moment(invoice.invoicedate).format('L')}</b></p>
                        </div>
                        <div>
                            <p className='text-secondary'>Payment Due</p>
                            <p className='fs-5'><b>{moment(invoice.paymentdue).format('L')}</b></p>
                        </div>
                    </div>
                    <div>
                        <p className='text-secondary'>Bill To</p>
                        <p className='fs-5'><b>{invoice.name}</b></p>
                        <p className='text-secondary'>{invoice.address1},</p>
                        <p className='text-secondary'>{invoice.address2},</p>
                        <p className='text-secondary'>{invoice.address3},</p>
                        <p className='text-secondary'>{invoice.zipcode}</p>
                    </div>
                    <div>
                        <p className='text-secondary'>Sent To</p>
                        <p className='View__Email'><b>{invoice.email}</b></p>
                    </div>
                </div>
                <table className="table table-borderless Table">
                    <tbody className='Table__Body'>
                        <tr className='Table__Row1'>
                            <td>Item Name</td>
                            <td align='right'>QTY.</td>
                            <td align='right'>Price</td>
                            <td align='right'>Total</td>
                        </tr>
                        <tr className='Table__Row2'>
                            <td>{invoice.itemname}</td>
                            <td align='right'>{invoice.quantity}</td>
                            <td align='right'>₹{invoice.price}</td>
                            <td align='right'>₹{(invoice.quantity * invoice.price).toFixed(2)}</td>
                        </tr>
                        <tr className='Table__Row3'>
                            <td className='align-middle'>Amount Due</td>
                            <td />
                            <td />
                            <td align='right' className='Table__Row3__Total'>₹{(invoice.quantity * invoice.price).toFixed(2)}</td>
                        </tr>
                    </tbody>
                </table>
                <table className="table table-borderless Table__Small">
                    <tbody className='Table__Body'>
                        <tr className='Table__Row2'>
                            <td className='align-middle'>{invoice.itemname}</td>
                            <td align='right' className='align-middle'>{invoice.quantity}x₹{invoice.price}</td>
                        </tr>
                        <tr className='Table__Row3'>
                            <td className='align-middle'>Amount Due</td>
                            <td align='right' className='Table__Row3__Total align-middle'>
                                ₹{(invoice.quantity * invoice.price).toFixed(2)}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </motion.div>
        </div >
    );
}

export default View;