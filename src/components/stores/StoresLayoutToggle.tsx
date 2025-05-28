import { ListBulletIcon, Squares2X2Icon } from "@heroicons/react/24/outline";
import { useState } from "react";
import type { PossibleStoreListLayout } from "../../types/stores";

type Props = {
    layout: PossibleStoreListLayout;
    onLayoutChange: (layout: PossibleStoreListLayout) => void;
}

function StoresLayoutToggle({ onLayoutChange, layout }: Props) {

  const changeLayout = (layout: PossibleStoreListLayout) => {
    onLayoutChange(layout);
  };

  return (
    <div className="p-[1px] rounded-xs bg-gray-200 inline-flex gap-1">
      <button
        className={`btn btn-square size-8 hover:bg-white ${
          layout !== "list" ? "bg-transparent" : ""
        }`}
        onClick={() => changeLayout("list")}
      >
        <ListBulletIcon className="size-6" />
      </button>
      <button
        className={`btn btn-square size-8 hover:bg-white ${
          layout !== "grid" ? "bg-transparent" : ""
        }`}
        onClick={() => changeLayout("grid")}
      >
        <Squares2X2Icon className="size-6" />
      </button>
    </div>
  );
}

export default StoresLayoutToggle;
