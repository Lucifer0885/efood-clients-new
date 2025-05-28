import { useEffect, useState } from "react";
import ProfileAddresses from "../components/profile/ProfileAddresses";
import ProfileInformation from "../components/profile/ProfileInformation";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../api/axiosInstance";
import type { Address, AddressResponse } from "../types/addresses";

function Profile() {
  const { user } = useAuth();
  const [ addresses, setAddresses ] = useState<Address[]>([]);

  useEffect(() => {
    axiosInstance.get<AddressResponse>('/client/addresses').then((res) => {
      if (!res.data.success) {
        return;
      }

      const data = res.data.data;
      setAddresses(data.addresses);
    });
  }, []);

  return (
    <div className="space-y-12 grid grid-cols-2 gap-x-8">
      <ProfileInformation user={user!} />
      <ProfileAddresses addresses={addresses}/>
    </div>
  );
}

export default Profile;
