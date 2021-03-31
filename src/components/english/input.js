import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import { Row, Col } from 'antd';
import Search from "antd/lib/input/Search";
import Speech from "./speech";
export default function Input() {
    const[error, setError] = useState("");
    const[SearchWord, setSearchWord] = useState("");
    const[word, setWord] = useState("");
    const[definitions, setDefinitions] = useState("");
    const[audio, setAudio] = useState("");
    useEffect(() => {}, []);
    const searching = async (word) => {
        var app_id = "88a2a902";
        var app_key = "e4659285a10f3eedb4f8a451a597a3b3";

        const result = await fetch(
            "https://cors-anywhere.herokuapp.com/https://od-api.oxforddictionaries.com/api/v2/entries/en-us/" + word, 
            {
            headers: {
                app_id,
                app_key
            }
        }
        );

        const data = await result.json();
        if(data.error) { //Apabila terjadi kesalahan atau tidak ada data
            setError("True");
            return;
        }
         //Inisialisasi dengan data dari API
        setWord(word);
        setDefinitions(data.results[0].lexicalEntries[0].entries[0].senses[0].definitions[0]);
        setAudio(data.results[0].lexicalEntries[0].entries[0].pronunciations[1].audioFile);
        setError(""); //Inisialisasi eror ke strings kosong
    }

    const findWitchSpeech = word => {   //Inisialisasi input voice ke searchword
        setSearchWord(word);
    }
    
    return (
        <Row>
            <Col span={12} offset={6}>
                <h1> Dinary - Dictionary English</h1>
                <Search value={SearchWord}
                onChange={event => setSearchWord(event.target.value)}
                placeholder="input search text" 
                onSearch={value => {searching(value);}} 
                enterButton />
                <Speech findWitchSpeech={findWitchSpeech}/>
            </Col>
            <Col span={6} offset={6}>
            {(() => {
            if (error) {
              return ( //Jika terjadi eror maka tampilkan berikut
                <p>No entry found matching supplied American English, word and provided filters</p>
              )
            } else {
                return ([ //Jika tidak ada eror
                    <p> {word} {SearchWord} - {definitions} </p>,
                    <p> {audio} </p>
                ]);
            }
            })()}
            </Col>
        </Row>
    );
};