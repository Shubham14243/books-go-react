import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth } from '../../AuthContext';
import { useEffect, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavbarText,
  Collapse,
  NavbarToggler
} from "reactstrap";
import { Link } from "react-router-dom"; // Import Link

const NavBar = (args) => {
  const { authState } = useAuth();
  const localStore = args.localStore;
  
  useEffect(() => {
    console.log('navbar rendered');
  }, []);
  
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar {...args}>
        <NavbarBrand tag={Link} to="/">Awesome Library</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            {authState.isloggedin === 'false' && (
              <>
                <NavItem>
                  <Link className="nav-link" to="/login">Login</Link>
                </NavItem>
                <NavItem>
                  <Link className="nav-link" to="/signup">SignUp</Link>
                </NavItem>
              </>
            )}

            {localStore.getItem('access') === 'admin' && (
              <NavItem>
                <Link className="nav-link" to="/users">Users</Link>
              </NavItem>
            )}
            {authState.isloggedin === 'true' && (
              <NavItem>
                <Link className="nav-link" to="/books">Books</Link>
              </NavItem>
            )}
            {localStore.getItem('access') === 'admin' && (
              <NavItem>
                <Link className="nav-link" to="/addBook">AddBook</Link>
              </NavItem>
            )}
            {localStore.getItem('access') === 'admin' && (
              <NavItem>
                <Link className="nav-link" to="/return">Return</Link>
              </NavItem>
            )}
          </Nav>
          <NavbarText>{authState.isloggedin && localStore.getItem('username')}</NavbarText>
          <Nav>
            {authState.isloggedin === 'true' && (
              <NavItem>
                <Link className="nav-link" to="/logout">Logout</Link>
              </NavItem>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default NavBar;
