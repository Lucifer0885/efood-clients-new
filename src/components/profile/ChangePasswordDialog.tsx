import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import {
  ChevronLeftIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
type Props = {
  open: boolean;
  setOpen: (value: boolean) => void;
};

function ChangePasswordDialog({ open, setOpen }: Props) {
  const { loading, error: authError, changePassword } = useAuth();

  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [showCurrentPassword, setShowCurrentPassword] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  const [error, setError] = useState<string>("");

  const onChangePassword = () => {
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password is less than 6 characters");
      return;
    }

    changePassword(currentPassword, password);
  };

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full h-full items-end justify-center text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative bg-white min-h-full h-full w-full transform text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in data-closed:sm:translate-y-0 data-closed:sm:scale-95"
          >
            <div
              className="flex justify-start items-center p-4 w-full"
              style={{ top: 0 }}
            >
              <button
                className="btn btn-circle size-8"
                onClick={() => setOpen(false)}
              >
                <ChevronLeftIcon className="size-4" />
              </button>
            </div>
            <div className="p-4">
              <h1 className="font-bold text-2xl">Change password</h1>
            </div>
            <div className="p-4 flex flex-col gap-8">
              <label className="input input-lg w-full">
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  value={currentPassword}
                  onChange={(ev) => setCurrentPassword(ev.target.value)}
                  name="current-password"
                  placeholder="Current password"
                  className="grow"
                />
                <button
                  className="btn btn-sm btn-circle"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  {showCurrentPassword ? (
                    <EyeSlashIcon className="size-4" />
                  ) : (
                    <EyeIcon className="size-4" />
                  )}
                </button>
              </label>
              <label className="input input-lg w-full">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(ev) => setPassword(ev.target.value)}
                  name="password"
                  placeholder="Password"
                  className="grow"
                />
                <button
                  className="btn btn-sm btn-circle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="size-4" />
                  ) : (
                    <EyeIcon className="size-4" />
                  )}
                </button>
              </label>
              <label className="input input-lg w-full">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(ev) => setConfirmPassword(ev.target.value)}
                  name="confirm-password"
                  placeholder="Confirm password"
                  className="grow"
                />
                <button
                  className="btn btn-sm btn-circle"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeSlashIcon className="size-4" />
                  ) : (
                    <EyeIcon className="size-4" />
                  )}
                </button>
              </label>
              <p>Your password should be at least 6 characters long.</p>

              {(error || authError) && (
                <div className="text-error text-center">
                  {error || authError}
                </div>
              )}
              <button
                className="btn btn-success btn-lg"
                disabled={loading}
                onClick={() => onChangePassword()}
              >
                {loading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  "Change password"
                )}
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

export default ChangePasswordDialog;
