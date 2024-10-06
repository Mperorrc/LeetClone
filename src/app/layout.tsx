"use client"
import { RecoilRoot } from "recoil";
import "./globals.css";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Head>
          <title>
            Leetcode 
          </title>
          <meta name="viewport" content=" width-device-width, initial-scale-1"/>
          <link rel="icon" href="/favicon.png" />
          <meta name="description" content="Web app tha contains leetcode problems and video solutions" />
      </Head>
      <html lang="en">
        <body>
          <ToastContainer />
          <RecoilRoot>
            {children}
          </RecoilRoot>
        </body>
      </html>
    </>
  );
}
