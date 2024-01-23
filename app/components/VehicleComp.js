'use client'
import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import Image from 'next/image';

const VehicleComp = (props) => {
    const { plateNumber, make, model } = props.data;
    const [src, setSrc] = useState('');
    const [qrCodeSize, setQRCodeSize] = useState({ width: 200, height: 200 }); 

    useEffect(() => {
        const makeAndModelText = `Make: ${make}, Model: ${model}, plateNumber: ${plateNumber}`;
        // const makeAndModelText = `https://google.com`;
        QRCode.toDataURL(makeAndModelText).then(setSrc);
    },[] );

    return (
        <div className='w-[90%] border border-green-400 rounded-3xl m-auto flex justify-between mt-3 mb-3 p-4'>

            <div className='w-1/2 pt-10'>
                <p className='text-[1.2rem]'>Plate Number: {plateNumber}</p>
                <p className='text-[1.2rem]'>Make: {make}</p>
                <p className='text-[1.2rem]'>Model: {model}</p>
                <br/>
                <br/>
                <br/>
                <p className='bg-green-400 text-white text-center  rounded-2xl'>registered!</p>
            </div>

            {/* QRCODE goes here */}
            <div>
                <Image src={src} alt='qrcode' width={qrCodeSize.width} height={qrCodeSize.height} />
            </div>
        </div>
    );
};

export default VehicleComp;

