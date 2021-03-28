import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import { Row, Col } from 'antd';
import Search from "antd/lib/input/Search";

export default function Input() {
    const [word, setWord] = useState("");
    const[error, setError] = useState("");
    useEffect(() => {
        Call();
    }, []);
    const Call = async () => {
        var app_id = "88a2a902";
        var app_key = "e4659285a10f3eedb4f8a451a597a3b3";

        const result = await fetch(
            "https://cors-anywhere.herokuapp.com/https://od-api.oxforddictionaries.com/api/v2/entries/en-us/dictionary", 
            {
            headers: {
                app_id,
                app_key
            }
        }
        );

        const data = await result.json();
        if(data.error) {
            setError(data.error)
        } 
        if (data) {
            //Get Definitions
            console.log(data.results[0].lexicalEntries[0].entries[0].senses[0].definitions[0]);
            //Get Audio
            console.log(data.results[0].lexicalEntries[0].entries[0].pronunciations[1].audioFile);
        }
    };

    return (
        <Row>
            <Col span={12} offset={6}>
                <h1> Dinary - Dictionary English</h1>
                <Search placeholder="input search text" onSearch={value => setWord(value)} enterButton />
            </Col>
            <Col span={6} offset={6}>
                <span> {word} </span>
                <span> {error} </span>
            </Col>
        </Row>
    );
};