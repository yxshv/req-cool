import { NextApiRequest, NextApiResponse } from "next";
import prettier from "prettier";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  
    const { method } = req;
    const body = req.body;

    if (method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    let format = body;
    let lang = "plain";

    if (body.trim().toLowerCase().startsWith("<!doctype html>")) {
        lang = "html";
    } else {
        try {
            JSON.parse(body);
            lang = "json";
        } catch {}
    }

    if (lang !== "plain") {
        format = prettier.format(body, { parser: lang });
    }

    res.status(200).json({
        format, lang
    })

}