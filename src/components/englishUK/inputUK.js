import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import Search from "antd/lib/input/Search";
import Speech from "./speech";
import { Card, Container, Row, Col } from 'react-bootstrap';
export default function InputUK() {
    const[error, setError] = useState("");
    const [SearchWord, setSearchWord] = useState("");
    const[word, setWord] = useState("");
    const[definitions, setDefinitions] = useState("");
    useEffect(() => {}, []);
    const searching = async (word) => {
        var app_id = "88a2a902";
        var app_key = "e4659285a10f3eedb4f8a451a597a3b3";

        const result = await fetch(
            "https://cors-anywhere.herokuapp.com/https://od-api.oxforddictionaries.com/api/v2/entries/en-gb/" + word, 
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
        setWord(word);
        setDefinitions(data.results[0].lexicalEntries[0].entries[0].senses[0].definitions[0]);
        setError(""); //Inisialisasi eror ke strings kosong
    }

    const findWitchSpeech = word => {   //Inisialisasi input voice ke searchword
        setSearchWord(word);
    }

    const suffix = (
        <Speech findWitchSpeech={findWitchSpeech} />
    );

    return (
        <div>
            <Container className="mt-5">
                <Row>
                    <Col sm={{ span: 6, offset: 3 }}>
                        <Card className="sear" border="secondary">
                            <Search
                                size="large"
                                value={SearchWord}
                                onChange={event => setSearchWord(event.target.value)}
                                placeholder="input search text"
                                onSearch={value => { searching(value); }}
                                suffix={suffix}
                                enterButton
                            />
                        </Card>
                    </Col>
                </Row>
                <h3 className="h12 mt-5">British English Dictionary</h3>
                <Row>
                    <Col sm={{ span: 8, offset: 2 }}>
                        <Card className="mt-3 sear" border="secondary">
                            <Card.Header className="bg-info" >
                                <div className="fw-title">
                                    Find a word :
                                </div>
                                {(() => {
                                    if (error) {
                                        return ( //Jika terjadi eror maka tampilkan berikut
                                            <div> </div>
                                        )
                                    } else {
                                        return ([ //Jika tidak ada eror
                                        <div className="fw-word">
                                            {word}
                                        </div>
                                        ]);
                                    }
                                })()}
                            </Card.Header>
                            <Card.Body>
                                {(() => {
                                    if (error) {
                                        return ( //Jika terjadi eror maka tampilkan berikut
                                            <div style={{ color: "red", fontWeight: 500 }}>No entry found matching supplied British English, word and provided filters</div>
                                        )
                                    } else {
                                        return ([ //Jika tidak ada eror

                                            <blockquote className="blockquote mb-0">
                                                <p>
                                                    {' '} {definitions} {' '}
                                                </p>
                                            </blockquote>
                                        ]);
                                    }
                                })()}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};