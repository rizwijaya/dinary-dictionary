import React, { useState } from "react";
import "antd/dist/antd.css";
import { Row, Col } from 'antd';
import Search from "antd/lib/input/Search";
export default function Input() {
    const [word, setWord] = useState("");
    return (
        <Row>
            <Col span={12} offset={6}>
                <h1>Dinary - Dictionary English</h1>
                <Search placeholder="input search text" onSearch={value => setWord(value)} enterButton />
            </Col>
            <Col span={6} offset={6}>
                <span> {word} </span>
            </Col>
        </Row>
    );
};