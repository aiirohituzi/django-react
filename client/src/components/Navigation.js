import React from 'react';

import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';
import MenuItem from 'react-bootstrap/lib/MenuItem';

export default class Navigation extends React.Component {

    constructor(props) {
        super(props);
        this.handleSelect = this.handleSelect.bind(this);
    }

    handleSelect(e) {
        switch(e){
            case 1:
                location.href = './Post';
                break;
            case 2:
                location.href = './Link2';
                break;
        }
    }

    handleSelectRight(e) {
        switch(e){
            case 1:
                location.href = './Admin';
                break;
        }
    }

    render() {
        return (
            <Navbar inverse collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="./"><b>aiirohituzi</b></a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <NavItem eventKey={1} onSelect={this.handleSelect}>게시물</NavItem>
                        <NavItem eventKey={2} onSelect={this.handleSelect}>Link2</NavItem>
                    </Nav>
                    <Nav pullRight>
                        <NavItem eventKey={1} onSelect={this.handleSelectRight}><img src={require("file-loader?name=[sha512:hash:base64:7].[ext]!../image/gear-1119298_1920.png")} style={{width: 20}}/>&nbsp;관리</NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}