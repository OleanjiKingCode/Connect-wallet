import Head from "next/head";

import { useState, useEffect, Fragment } from "react";
import { Listbox, Transition, Dialog } from "@headlessui/react";
import { RiArrowDownSLine } from "react-icons/ri";
import { useNetwork, useAccount, useConnect } from "wagmi";

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

  useEffect(() => {
    CheckNetwork();
  }, [isUserConnected]);

  const CheckNetwork = () => {
    if (isUserConnected && chain?.id !== config.chainId) {
      console.log(chain?.id, config.chainId);
      // onOpenSwitch();
    }
  };
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  const { connectors, connect } = useConnect({
    onSuccess() {
      closeModal();
    },
  });
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
          className={`w-full h-screen flex items-center text-center justify-center bg-orange-300 `}
        >
          <div className=" w-72 mr-6">
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
          {!isUserConnected ? (
            <button
              type="button"
              onClick={openModal}
              className="rounded-lg bg-black bg-opacity-20 px-4 py-2 text-center text-sm font-medium text-white hover:bg-opacity-30 "
            >
              Connect Wallet
            </button>
          ) : (
            <div> Connected</div>
          )}
          <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
              <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                  <Dialog.Panel className="w-full max-w-md transform ease-in-out duration-300 overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Connect Your Wallet
                    </Dialog.Title>
                    <div className="mt-2 mx-3">
                      <p className="text-sm text-gray-500">
                        Choose from the following
                      </p>
                    </div>
                    {connectors.map((connector, index) => (
                      <div
                        key={index}
                        className="border-2 rounded-lg my-3 cursor-pointer border-gray-300 w-full text-black px-2 py-3 hover:bg-gray-200 hover:text-gray-800"
                      >
                        {connector.name}
                      </div>
                    ))}

                    <div className="mt-4">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 "
                        onClick={closeModal}
                      >
                        Cancel
                      </button>
                    </div>
                  </Dialog.Panel>
                </div>
              </div>
            </Dialog>
          </Transition>
        </div>
      </div>
    </>
  );
}
