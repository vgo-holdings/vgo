"use client";
import React, { useEffect, useRef, useState, forwardRef } from "react"
import { saveAs } from "file-saver";
import { useQRCode } from 'next-qrcode'


const QRCode = forwardRef((props, ref) => {
    const { Canvas } = useQRCode();

    return (
        <div ref={ref}>
            <Canvas {...props} />
        </div>
    );
});


export default function qr({profileUrl}) {
    const qrRef = useRef();

    const onDownload = () => {
        const canva = document.getElementsByTagName("canvas")[0];
        console.log("🚀 ~ file: page.js:39 ~ onDownload ~ canva:", canva)
        canva.toBlob((blob) => {
            saveAs(blob, "qr-code.png");
        });
    };


    return (
        <div className="App">
            <QRCode
                ref={qrRef}
                text={profileUrl}
                options={{
                    errorCorrectionLevel: 'H',
                    margin: 2,
                    scale: 5,
                    width: 200,
                    color: {
                        dark: '#000000',
                        light: '#ffffff',
                    },
                }}
                logo={{
                    src: "./favicon.ico",
                    options: {
                        width: 35,
                        x: undefined,
                        y: undefined,
                    }
                }}
            />

            <button onClick={onDownload}>Download</button>
        </div>
    );
}
