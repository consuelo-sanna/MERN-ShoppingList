import React, { Component } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Container, Col } from 'reactstrap';
import RegisterModal from './auth/RegisterModal';
import Logout from './auth/Logout';

class AppNavbar extends Component {
    

    /* Usando le arrow function posso evitare di fare il bind delle funzioni
     * allora il costruttore non mi serve proprio, perchè posso creare lo stato fuori
    
    constructor(){
        super(props);
        this.toggle = this.toggle.bind(this); 
        this.state = {
            isOpen: false
        }
    }
    */

    state ={
        isOpen: false
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return(
            <div>
            <Navbar color="dark" dark expand="sm" className="mb-5" >
                <Container>
                    <NavbarBrand href="/"> Shopping List</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar> 
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <RegisterModal />
                            </NavItem>
                            <NavItem>
                                <Logout />
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
        </div>
        );
        
    }

}

export default AppNavbar;