import { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";
import type { CategoriesResponse, Category } from "../types/categories";
import CategoriesList from "../components/stores/CategoriesList";
import StoresList from "../components/stores/StoresList";
import type { Store, StoresResponse } from "../types/stores";
import StoresLayoutToggle from "../components/stores/StoresLayoutToggle";
import type { PossibleStoreListLayout } from "../types/stores";

function Stores() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [stores, setStores] = useState<Store[]>([]);
  const [layout, setLayout] = useState<PossibleStoreListLayout>("grid");

  useEffect(() => {
    axiosInstance
      .get<CategoriesResponse>("client/categories")
      .then((response) => {
        if (!response.data.success) {
          return;
        }

        setCategories(response.data.data.categories);
      });

    axiosInstance.get<StoresResponse>("client/stores").then((response) => {
      if (!response.data.success) {
        return;
      }

      setStores(response.data.data.stores);
    });
  }, []);

  const onLayoutChange = (layout: PossibleStoreListLayout) => {
    setLayout(layout);
  };
  return (
    <main className="p-6 bg-gray-50">
      <div>
        <CategoriesList categories={categories} />
      </div>
      <div className="mt-4">
        <div className="grid grid-cols-2 items-center mb-4">
          <div>
            {stores.length ? (
              <h2 className="font-bold text-lg">{stores.length} stores</h2>
            ) : (
              <div className="skeleton h-[28px] w-[160px]"></div>
            )}
          </div>
          <div className="text-end">
            <StoresLayoutToggle
              onLayoutChange={onLayoutChange}
              layout={layout}
            />
          </div>
        </div>
        <StoresList stores={stores} layout={layout} />
      </div>
    </main>
  );
}

export default Stores;
