import styled from "styled-components";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Feed from "../icons/feed";
import Admin from "../icons/admin";
import Company from "../icons/company";
import { supabase } from "../supabase";

const Navbar = styled.nav`
  position: fixed;
  z-index: 90;
  right: 0;
  bottom: 0;
  left: 0;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;
  padding: 10px 16px 40px;
  border-top: 1px solid #e5e7eb;
  border-radius: 20px 20px 0 0;
  background: rgb(255 255 255 / 95%);
  box-shadow: 0 1px 20px rgb(15 61 46 / 10%);
  backdrop-filter: blur(16px);

  @media (min-width: 800px) {
    right: auto;
    left: 50%;
    width: 60%;
    transform: translateX(-50%);
  }
`;

const NavItem = styled(NavLink)`
  display: flex;
  min-height: 58px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  border-radius: 14px;
  color: #66736d;
  font-size: 0.75rem;
  font-weight: 600;
  text-decoration: none;
  transition:
    color 160ms ease,
    background-color 160ms ease;

  &.active {
    background-color: #e9f3ed;
    color: var(--dark-primary-bg);
  }

  &:focus-visible {
    outline: 2px solid var(--primary-bg);
    outline-offset: 2px;
  }
`;

const AdminNavButton = styled.button`
  display: flex;
  min-height: 58px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  border: 0;
  border-radius: 14px;
  background: ${(props) => (props.$active ? "#e9f3ed" : "transparent")};
  color: ${(props) => (props.$active ? "var(--dark-primary-bg)" : "#66736d")};
  font: inherit;
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid var(--primary-bg);
    outline-offset: 2px;
  }

  &:disabled {
    cursor: wait;
    opacity: 0.65;
  }
`;

const BottomNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAdminActive =
    location.pathname === "/dashboard" || location.pathname === "/login";

  const openAdmin = async () => {
    try {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        throw error;
      }

      navigate(session ? "/dashboard" : "/login");
    } catch (error) {
      console.error("Unable to check the admin session:", error);
    }
  };

  return (
    <Navbar aria-label="التنقل الرئيسي">
      <NavItem to="/" end>
        <Feed width="22" height="22" color="currentColor" />
        <span>الرئيسية</span>
      </NavItem>

      <NavItem to="/company">
        <Company width="22" height="22" color="currentColor" />
        <span>الشركة</span>
      </NavItem>

      <AdminNavButton
        type="button"
        $active={isAdminActive}
        aria-current={isAdminActive ? "page" : undefined}
        onClick={openAdmin}
      >
        <Admin width="22" height="22" color="currentColor" />
        <span>الإدارة</span>
      </AdminNavButton>
    </Navbar>
  );
};

export default BottomNavbar;
