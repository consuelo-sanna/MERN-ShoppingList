import React, { Component, Fragment } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Container, Col } from 'reactstrap';
import { connect } from 'react-redux';
import RegisterModal from './auth/RegisterModal';
import Logout from './auth/Logout';
import LoginModal from './auth/LoginModal';
import PropTypes from 'prop-types';

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

    static propTypes = {
        auth: PropTypes.object.isRequired
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    };

    render() {
        const { isAuthenticated, user } = this.props.auth;
        const authLinks = (
            <Fragment>
                <NavItem>
                    <span className="navbar-text mr-3">
                        <strong>{ user ? `Welcome ${user.name}` : ''}</strong>
                    </span>
                </NavItem>
                <NavItem>
                    <Logout />
                </NavItem>
            </Fragment>
        );

        const guestLinks = (
            <Fragment>
                <NavItem>
                    <RegisterModal />
                </NavItem>
                <NavItem>
                    <LoginModal />
                </NavItem>
            </Fragment>
        );

        return(
            <div>
            <Navbar color="dark" dark expand="sm" className="mb-5" >
                <Container>
                    <NavbarBrand href="/"> Shopping List</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar> 
                        <Nav className="ml-auto" navbar>
                            { isAuthenticated ? authLinks : guestLinks}
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
        </div>
        );
        
    }

}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, null)(AppNavbar);