import { Menu } from "@headlessui/react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Avatar } from "@mui/material";
import { useDispatch } from "react-redux";
import type { Dispatch, AnyAction } from "@reduxjs/toolkit";
import { resetCart } from "@/store/reducer";

function handleLogout(dispatch: Dispatch<AnyAction>) {
  dispatch(resetCart());
  signOut({ callbackUrl: "/" });
}

const menuItems = [
  { label: "Profile", href: "/profile" },
  { label: "Order History", href: "/orders-history" },
  { label: "Logout", onClick: handleLogout },
];

export default function AvatarMenu() {
  const { data: session } = useSession();
  const dispatch = useDispatch();
  return (
    <Menu as="div" className="relative inline-block">
      <Menu.Button className="text-blue-600 p-2">
        <Avatar
          sx={{ width: 30, height: 30 }}
          alt={session?.user?.name || ""}
          src={session?.user?.image || ""}
        />
      </Menu.Button>

      <Menu.Items className="absolute right-0 w-56 origin-top-right bg-white shadow-lg z-10">
        {menuItems.map((item) => (
          <Menu.Item key={item.label}>
            {() =>
              item.href ? (
                <Link href={item.href} className="dropdown-link">
                  {item.label}
                </Link>
              ) : item.onClick ? (
                <a
                  className="dropdown-link"
                  onClick={() => item.onClick(dispatch)}
                >
                  {item.label}
                </a>
              ) : (
                <p>{item.label}</p>
              )
            }
          </Menu.Item>
        ))}
      </Menu.Items>
    </Menu>
  );
}
