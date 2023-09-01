// import React from "react";
import { NavLink } from "react-router-dom";
import { Fragment, useEffect } from "react";
import { useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";

const navegacionAdmin = [
  { name: "Dashboard", href: "/Dashboard", current: true },
  { name: "Reservas", href: "/Reservations", current: false },
  { name: "Calendario", href: "/git", current: false },
];

const navegacionUsuario = [
  { name: "Reservas", href: "/Reservations", current: true },
  { name: "Calendario", href: "/git", current: false },
];
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}


const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Establece esto según el estado de inicio de sesión del usuario
  const [isAdmin, setIsAdmin] = useState(false); // Establece esto según el rol del usuario
  const [loggedOut, setloggedOut] = useState(true);
  const login = useSelector(state => state.auth.user)
  const loginAdmin = useSelector(state => state.auth.admin)

  const getUserData = () => {
    const userDataString = localStorage.getItem('userData');
    return JSON.parse(userDataString);
  };

  console.log(getUserData());

 const logOut = ()=>{
  setIsLoggedIn(false)
  setIsAdmin(false)
  setloggedOut(true)
 }

useEffect(()=>{
  const setUser = ()=>{
    if(login === true){
      setIsLoggedIn(true)
      setloggedOut(false)
    }
    else if (login === false){
      setloggedOut(true)
      setIsLoggedIn(false)
    }
    if(loginAdmin === true){
      setIsAdmin(true)
    }
  }
  setUser()


})

  const navegacion = isAdmin ? navegacionAdmin : navegacionUsuario;
  return (
    <Disclosure as="nav" className="bg-[#16242f]">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center  sm:items-stretch sm:justify-start" >
                <NavLink
                  to="/"
                  className="flex flex-shrink-0 items-center h-16"
                >
                  <img
                    className="h-full max-w-full"
                    src="./logo.jpg"
                    alt="Your Company"
                  />
                </NavLink>
                {isLoggedIn ? (
                  <div
                    className="hidden sm:ml-6 sm:block"
                    style={{margin:"auto"}}
                  >
                    <div className="flex space-x-4">
                      {navegacion.map((item) => (
                        <NavLink
                          key={item.name}
                          to={item.href}
                          className={classNames(
                            item.current
                              ? "bg-gray-900 text-white"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white",
                            "rounded-md px-3 py-2 text-sm font-medium"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div
                className={`flex items-center sm:ml-6 ${
                  loggedOut ? "visible" : "invisible"
                }`}
                style={{ gap: "10px" }}
              >
                <NavLink to="/register"><h2 className="text-white">Registrarse</h2></NavLink>
                <div className="bg-white w-1 h-8 "></div>
                <NavLink to="/login"><h2 className="text-white">Login</h2></NavLink>
              </div>
              {isLoggedIn && (
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <button
                    type="button"
                    className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>

                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-8 w-8 rounded-full"
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          alt=""
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Your Profile
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Settings
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={logOut}
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Sign out
                            </button>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              )}
            </div>
          </div>
          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navegacion.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
