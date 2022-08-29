import React from "react";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../redux/actions/userActions";
const Header = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logOut());
  };

  return (
    <header>
      <Navbar bg="primary" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>B I K E - B U N G Y</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              {userInfo && userInfo?.user?.role === "MANAGER" ? (
                <NavDropdown title="Manage">
                  <LinkContainer
                    to={`/manage/${userInfo?.user?.id}/myreservations`}
                  >
                    <NavDropdown.Item>My Reservations</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to={`/manage/bikes/1`}>
                    <NavDropdown.Item>Bikes</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to={`/manage/users/1`}>
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to={`/manage/reservations/user/page/1`}>
                    <NavDropdown.Item>Users-Reservations</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to={`/manage/reservations/bikes/page/1`}>
                    <NavDropdown.Item>Bikes-Reservations</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              ) : (
                ""
              )}
              {userInfo ? (
                <NavDropdown title={userInfo?.user?.name}>
                  {userInfo && userInfo?.user?.role === "REGULAR" && (
                    <LinkContainer
                      to={`/user/${userInfo?.user?.id}/reservations`}
                    >
                      <NavDropdown.Item>Reservations</NavDropdown.Item>
                    </LinkContainer>
                  )}
                  <NavDropdown.Item onClick={logoutHandler}>
                    LogOut
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>Login/SignUp</Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
