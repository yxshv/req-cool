import { NextApiRequest, NextApiResponse } from "next";
import prettier from "prettier";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  
    const { method } = req;
    const body = JSON.parse(req.body);

    if (method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    let format = body;
    let lang = "plain";

    if (body.trim().toLowerCase().startsWith("<!doctype html>")) {
        format = prettier.format(body, { parser: "html" })
        lang = "html";
    } else {
        try {
            format = prettier.format(body, { parser: "json" });
            lang = "json";
        } catch {
            format = body;
        }
    }


    res.status(200).json({
        format, lang
    })

}