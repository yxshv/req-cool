export interface Content {
    type: "application/x-www-form-urlencoded" | "application/json" | "text/html" | "application/xml" | "text/plain" | "custom";
    content: string
}

export interface Auth {
    selected: "none" | "bearer" | "basic" | "custom";
    bearer: string;
    basic: {
        username: string;
        password: string;
    };
    custom: string
}