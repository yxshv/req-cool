/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { AnimateSharedLayout } from "framer-motion";
import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import Modal from "../components/Modal";
import TabBtn from "../components/TabBtn";
import AuthTab from "../components/Tabs/AuthTab";
import ContentTab from "../components/Tabs/ContentTab";
import HeadersTab from "../components/Tabs/HeadersTab";
import { Auth, Content } from "../types";
import Error from "../components/Error";

const Home: NextPage = () => {

  const [tab, setTab] = useState(0);
  const [auth, setAuth] = useState<Auth>({
    selected: "none",
    bearer: "",
    basic: {
      username: "",
      password: ""
    },
    custom: ""
  });
  const [content, setContent] = useState<Content>({
    type: "application/json",
    content: "{}"
  });
  const [headers, setHeaders] = useState("{}");

  const [url, setUrl] = useState("");
  const [method, setMethod] = useState<"GET" | "POST" | "PUT" | "PATCH" | "OPTIONS" | "DELETE" | "HEAD">("GET");
  const [open, setOpen] = useState(false);

  const [resp, setResp] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [modalTab, setModalTab] = useState(0);

  const [formatted, setFormatted] = useState<{ format: string; lang: string } | null>(null);

  useEffect(() => {
    if (url.trim() === "" || (!url.startsWith("http://") && !url.startsWith("https://"))) setError("Invalid URL");
    else setError(null);
  }, [url])

  useEffect(() => {
    if (!resp) return

    (async () => {
      console.log("sending")
      const r = await fetch(`/api/format`, {
        method: "POST",
        body: resp.content
      })
      const t = await r.json();
      setFormatted(t);
    })();
  }, [resp])

  return (
    <>
      <Head>
        <title>ReqCool</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="px-2 min-h-screen text-light-dark py-7 bg-dark">
        <Modal open={open} setOpen={setOpen}>
          {resp && (
            <>
              <div className="mt-4 flex flex-col gap-2">
                <div className="flex justify-center items-center gap-5">
                  <div
                    className={`
                      ${(`${resp.status}`).startsWith("2") && "text-green-500"} 
                      ${((`${resp.status}`).startsWith("4") || (`${resp.status}`).startsWith("5")) && "text-red-500"}
                      ${((`${resp.status}`).startsWith("1") || (`${resp.status}`).startsWith("3")) && "text-yellow-400"}

                      flex justify-center items-center gap-1 text-xl

                    `}
                  >
                    <svg width="1em" height="1em" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10s10-4.47 10-10S17.53 2 12 2z" />
                    </svg>
                    {resp.status}
                  </div>
                  <div
                    className={`
                      ${resp.time_taken < 1500 && "text-green-500"} 
                      ${(resp.time_taken < 5000 && resp.time_taken > 1500) && "text-yellow-400"} 
                      ${resp.time_taken > 5000 && "text-red-500"}

                      flex justify-center items-center gap-1 text-xl

                    `}
                  >
                    <svg width="1em" height="1em" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M10 3q-.425 0-.712-.288Q9 2.425 9 2t.288-.713Q9.575 1 10 1h4q.425 0 .713.287Q15 1.575 15 2t-.287.712Q14.425 3 14 3Zm2 11q.425 0 .713-.288Q13 13.425 13 13V9q0-.425-.287-.713Q12.425 8 12 8t-.712.287Q11 8.575 11 9v4q0 .425.288.712q.287.288.712.288Zm0 8q-1.85 0-3.488-.712q-1.637-.713-2.862-1.938t-1.938-2.862Q3 14.85 3 13t.712-3.488Q4.425 7.875 5.65 6.65t2.862-1.937Q10.15 4 12 4q1.55 0 2.975.5t2.675 1.45l.725-.725q.275-.275.675-.275t.7.3q.275.275.275.7q0 .425-.275.7l-.7.7Q20 8.6 20.5 10.025Q21 11.45 21 13q0 1.85-.712 3.488q-.713 1.637-1.938 2.862t-2.862 1.938Q13.85 22 12 22Zm0-2q2.9 0 4.95-2.05Q19 15.9 19 13q0-2.9-2.05-4.95Q14.9 6 12 6Q9.1 6 7.05 8.05Q5 10.1 5 13q0 2.9 2.05 4.95Q9.1 20 12 20Zm0-7Z" />
                    </svg>
                    {resp.time_taken} ms
                  </div>
                  <div
                    className={`
                      ${resp.time_taken < 1500 && "text-green-500"} 
                      ${(resp.time_taken < 5000 && resp.time_taken > 1500) && "text-yellow-400"} 
                      ${resp.time_taken > 5000 && "text-red-500"}

                      flex justify-center items-center gap-1 text-xl

                    `}
                  >
                    <svg width="1.2em" height="1.2em" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M4 20q-.825 0-1.412-.587Q2 18.825 2 18V6q0-.825.588-1.412Q3.175 4 4 4h5.175q.4 0 .763.15q.362.15.637.425L12 6h8q.825 0 1.413.588Q22 7.175 22 8v10q0 .825-.587 1.413Q20.825 20 20 20Z" />
                    </svg>
                    {resp.size} kb
                  </div>
                </div>
                <div className="w-full">
                  <div className="flex justify-center items-center gap-2">
                    {(String(resp.content).toLowerCase().startsWith("<!doctype html>")) && (
                      <TabBtn
                        text="Raw"
                        my={0}
                        tab={modalTab}
                        setTab={setModalTab}
                      />
                    )}
                    {/* <TabBtn
                      text="Headers"
                      my={1}
                      tab={modalTab}
                      setTab={setModalTab}
                    /> */}
                    {String(resp.content).toLowerCase().startsWith("<!doctype html>") && (
                      <TabBtn
                        text="HTML"
                        my={2}
                        tab={modalTab}
                        setTab={setModalTab}
                      />
                    )}
                  </div>
                  <div className="mt-2 overflow-y-auto w-full">
                    {(modalTab === 0 || !(String(resp.content).toLowerCase().startsWith("<!doctype html>"))) && (
                      <pre
                        className="p-5 overflow-y-auto text-white bg-dark/80 rounded-md scrollbar-thin h-[350px] md:h-[250px]"
                      >
                        {formatted?.format ?? resp.content}
                      </pre>
                    )}
                    {(modalTab === 2 && (String(resp.content).toLowerCase().startsWith("<!doctype html>"))) && (
                      <iframe
                        srcDoc={resp.content}
                        className="overflow-y-auto w-full rounded-md h-[350px] scrollbar-thin md:h-[250px]"
                      />
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
          {loading && (
            <div className="flex w-full h-[250px] justify-center items-center">
              <svg className="-ml-1 mr-3 h-5 w-5 text-purple-400 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          )}
        </Modal>
        <div className="flex justify-center items-center">
          <button className="cool hover:underline hover:decoration-wavy decoration-1 underline-offset-2 decoration-purple-400 font-extrabold text-5xl text-center text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-purple-400 to-pink-200 animate-gradient-text">
            ReqCool
          </button>
        </div>

        <div className="flex w-full mt-5 justify-center items-center">
          <div className="w-full md:max-w-[600px]">
            <Error error={error} />
            <div className="gap-1 flex">
              <input onChange={(e) => setUrl(e.target.value)} placeholder="https://" className="w-full bg-dark-light rounded-md border-2 border-transparent flex-grow focus:border-purple-400 text-purple-400 px-3 py-2 focus:outline-none" />
              <select
                // @ts-ignore
                onChange={(e) => setMethod(e.target.value)}
                className="bg-dark-light text-purple-400 px-2 py-2 rounded-md focus:outline-none focus:border-purple-400 border-2 border-transparent"
              >
                <option>GET</option>
                <option>POST</option>
                <option>PUT</option>
                <option>PATCH</option>
                <option>DELETE</option>
                <option>HEAD</option>
                <option>OPTIONS</option>
              </select>
              <button
                onClick={async () => {
                  setResp(null);
                  if (error) {
                    setError(prev => prev);
                    return;
                  }
                  setLoading(true);
                  setOpen(true);
                const resp = await fetch(`/api/make_request`, {
                    method: "POST",
                    body: JSON.stringify({
                      url: url, method: method, headers: headers, auth: auth, content: content
                    })
                  })
                  const data = await resp.json();
                  setResp(data);
                  setLoading(false)
                }}
                className="px-3 focus:outline-none focus:bg-purple-400 py-2 rounded-md border-2 border-purple-400 hover:bg-purple-400 bg-dark-light"
              >
                Send
              </button>
            </div>

            <div className="mt-5">
              <div className="flex gap-1">
                <AnimateSharedLayout>

                  <TabBtn
                    text="Authorization"
                    tab={tab}
                    setTab={setTab}
                    my={0}
                  />
                  <TabBtn
                    text="Content"
                    tab={tab}
                    setTab={setTab}
                    my={1}
                  />
                  <TabBtn
                    text="Headers"
                    tab={tab}
                    setTab={setTab}
                    my={2}
                  />
                </AnimateSharedLayout>
              </div>
              {tab === 0 && <AuthTab val={auth} setVal={setAuth} />}
              {tab === 1 && <ContentTab val={content} setVal={setContent} />}
              {tab === 2 && <HeadersTab val={headers} setVal={setHeaders} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;