import { useAuth } from "../context/AuthContext";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { Link } from "react-router";
import axiosInstance from "../api/axiosInstance";
import ChangePasswordDialog from "../components/profile/ChangePasswordDialog";

function Profile() {
  const { user, loading, error, update, logout } = useAuth();

  const [name, setName] = useState<string>(user!.name);
  const [phone, setPhone] = useState<string>(user!.phone || "");

  const [openChangePassword, setOpenChangePassword] = useState<boolean>(false);

  const onSaveChanges = async () => {
    update(name, phone);
  };

  return (
    <div>
      <div className="my-4 px-2">
        <Link to={"/account"}>
          <button className="btn btn-circle btn-ghost">
            <ChevronLeftIcon className="size-8" />
          </button>
        </Link>
      </div>
      <div className="p-4">
        <div className="font-bold text-2xl mb-10">Profile</div>
        <div className="flex flex-col gap-8">
          <label className="floating-label">
            <input
              type="email"
              disabled
              value={user!.email}
              placeholder="Email"
              className="input input-lg w-full"
            />
            <span>Email</span>
          </label>
          <label className="floating-label">
            <input
              type="text"
              value={name}
              onChange={(ev) => setName(ev.target.value)}
              name="name"
              placeholder="Name"
              className="input input-lg w-full"
            />
            <span>Name</span>
          </label>
          <label className="floating-label">
            <input
              type="text"
              value={phone}
              onChange={(ev) => setPhone(ev.target.value)}
              name="phone"
              placeholder="Phone"
              className="input input-lg w-full"
            />
            <span>Phone</span>
          </label>
          {error && <div className="text-error text-center">{error}</div>}
          <button
            className="btn btn-success btn-lg"
            disabled={loading || !name}
            onClick={() => onSaveChanges()}
          >
            {loading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              "Save changes"
            )}
          </button>
        </div>
      </div>
      <div className="mt-4 px-4">
        <a
          href="javascript:void(0)"
          className="py-4 block border-b border-gray-200"
          onClick={() => setOpenChangePassword(true)}
        >
          <div className="flex justify-between items-center">
            Change password
            <ChevronRightIcon className="size-5 text-gray-500" />
          </div>
        </a>
        <a
          href="javascript:void(0)"
          className="py-4 block text-error"
          onClick={() => logout()}
        >
          <div className="flex justify-between items-center">
            Log out
            <ChevronRightIcon className="size-5 text-gray-500" />
          </div>
        </a>
      </div>

      <ChangePasswordDialog
        open={openChangePassword}
        setOpen={setOpenChangePassword}
      />
    </div>
  );
}

export default Profile;
