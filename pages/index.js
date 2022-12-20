import Head from "next/head";

import { useState, useEffect, Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { RiCheckFill, RiArrowDownSLine } from "react-icons/ri";
import { useNetwork, useAccount } from "wagmi";

export default function Home() {
  const NETWORK_DATA = [
    {
      id: 1,
      image: "/polygon.png",
      name: "Polygon",
      isActive: true,
    },
    {
      id: 2,
      image: "/eth.png",
      name: "Ethereum",
      isActive: false,
    },
  ];
  const [currentNetwork, setCurrentNetwork] = useState(NETWORK_DATA[0]);
  const { chain } = useNetwork();
  const { isConnected: isUserConnected } = useAccount();
  // useEffect(() => {
  //   CheckNetwork();
  // }, [isUserConnected]);

  // const CheckNetwork = () => {
  //   if (isUserConnected && chain?.id !== config.chainId) {
  //     console.log(chain?.id, config.chainId);
  //     onOpenSwitch();
  //   }
  // };
  return (
    <>
      <Head>
        <title>Connect Wallet App</title>
        <meta name="description" content="Connect wallet app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="w-full">
        <div
          className={`w-full h-screen flex flex-col items-center text-center justify-center bg-orange-300 `}
        >
          <div className=" w-72">
            <Listbox value={currentNetwork} onChange={setCurrentNetwork}>
              <div className="relative mt-1">
                <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                  <span className="flex items-center ">
                    {" "}
                    <img
                      src={currentNetwork.image}
                      alt={currentNetwork.name}
                      width="34px"
                    />
                    {currentNetwork.name}
                  </span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <RiArrowDownSLine
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {NETWORK_DATA.map((person, personIdx) => (
                      <Listbox.Option
                        key={personIdx}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 px-4  ${
                            active
                              ? "bg-amber-100 text-amber-900"
                              : "text-gray-900"
                          }`
                        }
                        value={person}
                      >
                        {({ selected }) => (
                          <>
                            <span
                              className={`flex items-center w-full text-left ${
                                selected ? "font-medium" : "font-normal"
                              }`}
                            >
                              <img
                                src={person.image}
                                alt={person.name}
                                width="34px"
                              />
                              {person.name}
                            </span>
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
          </div>
        </div>
      </div>
    </>
  );
}
