import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  
    const { method } = req;
    const body = JSON.parse(req.body);

    if (method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    let auth = null;

    if (body.auth) {
        if (body.auth.selected === "bearer" && body.auth.bearer.trim() !== "Bearer") auth = body.auth.bearer
        else if (body.auth.selected === "basic" && body.auth.basic.username.trim() !== "" && body.auth.basic.password.trim() !== "") {
            const { username, password } = body.auth;
            auth = `Basic ${Buffer.from(`${username}:${password}`).toString("base64")}`;
        } else if (body.auth.selected === "custom" && body.auth.custom.trim() !== "") auth = body.auth.custom
    }

    if (body.headers.trim() == "") body.headers = "{}";

    let resp;

    let time_taken;

    if (body.method === "GET" || body.method === "HEAD") {
        const start_time = Date.now();
        resp = await fetch(body.url, {
            method: body.method,
            headers: { 
                ...JSON.parse(body.headers), 
                "Content-Type": body.content.type, 
                "Authorization": auth ?? ""
            },
        })
        time_taken = Date.now() - start_time;
    } else {
        const start_time = Date.now();
        resp = await fetch(body.url, {
            method: body.method,
            headers: { 
                ...JSON.parse(body.headers), 
                "Content-Type": body.content.type, 
                "Authorization": auth ?? ""
            },
            body: body.content.content
        })
        time_taken = Date.now() - start_time;
    }

    const data = await resp.text();

    const size;

    res.status(200).json({
        status: resp.status,
        headers: resp.headers,
        content: data,
        resp, time_taken,
        size: file.byteLength
    })

}