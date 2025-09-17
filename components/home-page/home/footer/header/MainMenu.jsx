import Link from "next/link";
import {
  whoWheAreItems,
  blogItems,
  whatWeDoItems,
  productItems,
} from "../../../../../data/menu";
import {
  isActiveLink,
  isActiveParent,
  isActiveParentChaild,
} from "../../../../../utils/linkActiveChecker";
import { useRouter } from "next/router";
import Image from "next/image";

const MainMenu = () => {
  const router = useRouter();
  return (
    <nav className="navbar navbar-expand-lg order-lg-2">
      <button
        className="navbar-toggler d-block d-lg-none"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span />
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link
              className="nav-link dropdown-toggle"
              href="/who-we-are"
              role="button"
            >
              Who We Are
            </Link>
          </li>

          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              data-bs-auto-close="outside"
              aria-expanded="false"
            >
              What We Do
            </a>
            <ul className="dropdown-menu">
              {whatWeDoItems.map((blog, index) => (
                <li key={index}>
                  <Link href={blog.link} className="dropdown-item">
                    <span>{blog.text}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </li>

          <li className="nav-item dropdown mega-dropdown-md">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              data-bs-auto-close="outside"
              aria-expanded="false"
            >
              Our Products
            </a>
            <ul className="dropdown-menu">
              {productItems.map((menu, menuIndex) => (
                <div className="menu-column" key={menuIndex}>
                  {menu.items.map((item, itemIndex) => (
                    <li key={itemIndex}>
                      <Link href={item.link} className="dropdown-item">
                        <span>{item.title}</span>
                      </Link>
                    </li>
                  ))}
                </div>
              ))}
            </ul>
          </li>

          {/* Uncomment the block below when you're ready to use it.
          <li className="nav-item  dropdown">
            ...
          </li>
          */}

          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              data-bs-auto-close="outside"
              aria-expanded="false"
            >
              Read More
            </a>
            <ul className="dropdown-menu">
              {blogItems.map((blog, index) => (
                <li key={index}>
                  <Link href={blog.link} className="dropdown-item">
                    <span>{blog.text}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default MainMenu;
