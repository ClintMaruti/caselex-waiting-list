import axios from "axios";
import * as React from "react";

export const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
        .post("https://script.google.com/macros/s/AKfycbxs8k7PuswkPTEcvmCtympBJ_F7dnwzkeTFY40gboIp44wnpALOJIJZEvKLeu27ZEnReQ/exec", {})
        .then((res) => res.data)
        .then((data) => {
            console.log(data);
        })
        .catch((error) => {
            console.log(error);
        });
};
