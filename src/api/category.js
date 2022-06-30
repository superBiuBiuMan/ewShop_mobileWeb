import ajax from "./ajax.js";

export function reqCategory(){
    return ajax.get("/api/goods");
}