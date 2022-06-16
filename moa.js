import axios from "axios";

export async function getQrCode(number){
    const res = await axios.get(`https://dev.callback.mileonair.com:8444/api/v1/qr/phoneToQr?phone=${number}`,
    {headers: {
        Authorization: "Bearer 77f763e0d3fe1ca63a9030dcecd700fe"
    }});
    return res.data.data.qr;
}


export async function getBalance(qr){
    const res = await axios.get(`https://dev.callback.mileonair.com:8444/api/v1/qr/balance?qr=${qr}`,
    {headers: {
        Authorization: "Bearer 77f763e0d3fe1ca63a9030dcecd700fe"
    }});
    return  res.data.data.mile_count;
}

export async function initialTransaction(qr){
    const res = await axios.get(`https://dev.callback.mileonair.com:8444/api/v1/qr/info?qr=${qr}`,
    {headers: {
        Authorization: "Bearer 77f763e0d3fe1ca63a9030dcecd700fe"
    }});
    return res.data.data; // mile_count, transaction_uuid, redeem_part, min_redeem_mile_count
}



export async function collectMoa(data){
    const res = await axios.post("https://dev.callback.mileonair.com:8444/api/v1/miles/collect", 
    data, // transaction_uuid, receipt : { fn_number, date, organization_name, organization_inn, point_name, kkt_number, operator, type, amount(копейки), products: [], url } 
    {headers:{
        Authorization: "Bearer 77f763e0d3fe1ca63a9030dcecd700fe"
    }});
    return res.data;
}


export async function RCCSendMSG(data){
    const res = await axios.post("https://dev.callback.mileonair.com:8444/api/v1/rcc", 
    data, // transaction_uuid, mile_count, organization_name, point_name
    {headers:{
        Authorization: "Bearer 77f763e0d3fe1ca63a9030dcecd700fe"
    }});
    return res.data;    // responseCode, responseMessage
}


export async function RCCFreezy(data){
    const res = await axios.post("https://dev.callback.mileonair.com:8444/api/v1/miles/freeze", 
    data, // transaction_uuid, confirmation_code
    {headers:{
        Authorization: "Bearer 77f763e0d3fe1ca63a9030dcecd700fe"
    }});
    return res.data; 
}


export async function RCCDiscard(data){
    const res = await axios.put("https://dev.callback.mileonair.com:8444/api/v1/miles/redeem", 
    data, // transaction_uuid, confirmation_code, receipt : { fn_number, date, organization_name, organization_inn, point_name, kkt_number, operator, type, amount(копейки), products: [], url }
    {headers:{
        Authorization: "Bearer 77f763e0d3fe1ca63a9030dcecd700fe"
    }});
    return res.data;
}


export async function RCCUnfreezy(data){
    const res = await axios.post("https://dev.callback.mileonair.com:8444/api/v1/miles/unfreeze", 
    data, // transaction_uuid
    {headers:{
        Authorization: "Bearer 77f763e0d3fe1ca63a9030dcecd700fe"
    }});
    return res.data;
}


export async function Retrieve(data){
    const res = await axios.post("https://dev.callback.mileonair.com:8444/api/v1/miles/retrieve", 
    data, // receipt : { fn_number, date, organization_name, organization_inn, point_name, kkt_number, operator, type, amount(копейки), products: [], url }
    {headers:{
        Authorization: "Bearer 77f763e0d3fe1ca63a9030dcecd700fe"
    }});
    return res.data;
}