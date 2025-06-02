import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import GoogleMap from "google-maps-react-markers";
import MapMarker from '../profile/MapMarker';
import type { Store } from "../../types/stores";

type Props = {
  open: boolean;
  setOpen: (state: boolean) => void;
  store: Store;
};

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

function StoreInformationDialog({ open, setOpen, store }: Props) {
  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative min-w-[90%] transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-sm sm:p-6 lg:max-w-[90%] data-closed:sm:translate-y-0 data-closed:sm:scale-95"
          >
            <div className="flex justify-end">
              <button
                className="btn btn-circle size-8"
                onClick={() => setOpen(false)}
              >
                <XMarkIcon className="size-4" />
              </button>
            </div>
            <div>
              <h2 className="font-bold text-md">Store Address</h2>
              <p className="text-gray-400 mb-2">{store?.address}</p>
              <div>
                {open && store && (
                  <GoogleMap
                    apiKey=""
                    defaultCenter={{
                      lat: +store?.latitude,
                      lng: +store?.longitude,
                    }}
                    defaultZoom={5}
                    options={{}}
                    mapMinHeight="400px"
                  >
                    <MapMarker
                      lat={+store?.latitude}
                      lng={+store?.longitude}
                      markerId={"address-location"}
                    ></MapMarker>
                  </GoogleMap>
                )}
              </div>
              {store?.working_hours?.length && (
                <>
                  <h2 className="font-bold text-md mt-4">Working Hours</h2>
                  <ul className="divide-y divide-gray-200">
                    {store?.working_hours.map((wh, index) => (
                      <li
                        key={index}
                        className="py-3 flex items-center justify-between"
                      >
                        <div className="font-bold text-sm">{days[index]}</div>
                        <div className="text-gray-500 text-sm">
                          {wh.start} - {wh.end}
                        </div>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

export default StoreInformationDialog;
