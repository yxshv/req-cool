/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";

const AuthTab = ({ val, setVal }: {
    val: any;
    setVal: any;
}) => {

    const [auth, setAuth] = useState<"basic" | "bearer" | "custom">("bearer");

    useEffect(() => {
        setVal({ ...val, selected: auth });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [auth])

    return (
        <div className="mt-2 w-full p-5 rounded-md">
            <form className="flex gap-5 justify-center items-center mb-5">
                <div className="flex gap-2 justify-center items-center">
                    <input defaultChecked onClick={() => setAuth("bearer")} name="auth-radio" value="bearer-radio" type="radio" className="accent-purple-400" /><label>Bearer Token</label>
                </div>
                <div className="flex gap-2 justify-center items-center">
                    <input onClick={() => setAuth("basic")} name="auth-radio" value="basic-radio" type="radio" className="accent-purple-400" /><label>Basic Auth</label>
                </div>
                <div className="flex gap-2 justify-center items-center">
                    <input onClick={() => setAuth("custom")} name="auth-radio" value="custom-radio" type="radio" className="accent-purple-400" /><label>Custom</label>
                </div>
            </form>
            {auth === "bearer" && (
                <div className="flex gap-3 justify-center items-start">
                    <h1 className="text-lg mt-2">Token</h1>
                    <div className="flex flex-col w-full">
                        <input onChange={(e) => {
                            setVal((prev: any) => {
                                return {
                                    ...prev,
                                    bearer: `Bearer ${e.target.value}`
                                }
                            })
                        }} className="w-full bg-dark-light rounded-md border-2 border-transparent flex-grow focus:border-purple-400 text-purple-400 px-3 py-2 focus:outline-none" />
                        <p className="text-xs mt-2 text-light-dark/80">The authorization header will be automatically generated when you send the request.</p>
                    </div>
                </div>
            )}
            {auth === "basic" && (
                <div className="flex flex-col gap-2 items-center justify-center">
                    <h1 className="text-lg font-bold">Basic Authorization</h1>
                    <input onChange={(e) => {
                        setVal((prev: any) => {
                            return {
                                ...prev,
                                basic: {
                                    password: prev.basic.password,
                                    username: e.target.value
                                }
                            }
                        })
                    }} placeholder="Username" className="w-full bg-dark-light rounded-md border-2 border-transparent flex-grow focus:border-purple-400 text-purple-400 px-3 py-2 focus:outline-none" />
                    <input onChange={(e) => {
                        setVal((prev: any) => {
                            return {
                                ...prev,
                                basic: {
                                    password: e.target.value,
                                    username: prev.basic.username
                                }
                            }
                        })
                    }} placeholder="Password" className="w-full bg-dark-light rounded-md border-2 border-transparent flex-grow focus:border-purple-400 text-purple-400 px-3 py-2 focus:outline-none" />
                    <p className="text-xs mt-1 text-light-dark/80">The authorization header will be automatically generated when you send the request.</p>
                </div>
            )}
            {auth === "custom" && (
                <div className="flex gap-3 justify-center items-start">
                    <h1 className="text-lg mt-2">Authorization</h1>
                    <div className="flex flex-col w-full">
                        <input onChange={(e) => {
                            setVal((prev: any) => {
                                return {
                                    ...prev,
                                    custom: e.target.value
                                }
                            })
                        }} className="w-full bg-dark-light rounded-md border-2 border-transparent flex-grow focus:border-purple-400 text-purple-400 px-3 py-2 focus:outline-none" />
                        <p className="text-xs mt-2 text-light-dark/80">The authorization header will be automatically generated when you send the request.</p>
                    </div>
                </div>
            )}

        </div>
    )
}

export default AuthTab;