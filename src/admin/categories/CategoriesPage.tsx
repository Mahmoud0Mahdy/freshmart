import { useEffect, useState } from "react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Search } from "lucide-react";
import { toast } from "sonner";

import { getCategories } from "../../api/adminApi";
import AddCategoryModal from "./components/AddCategoryModal";

export function CategoriesPage() {

  const [categories, setCategories] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");

  const [openModal, setOpenModal] = useState(false);

  // 🔥 GET (حل المشكلة هنا)
  const fetchData = async () => {
    try {
      setLoading(true);

      const recipe = await getCategories(1);
      const product = await getCategories(2);

      const data = [
        ...recipe.map((c: any) => ({ ...c, type: 1 })),
        ...product.map((c: any) => ({ ...c, type: 2 })),
      ];

      setCategories(data);
      setFiltered(data);

    } catch {
      toast.error("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 🔥 FILTER
  useEffect(() => {
    let data = [...categories];

    if (filterType !== "all") {
      data = data.filter((c) =>
        filterType === "recipe" ? c.type === 1 : c.type === 2
      );
    }

    if (search) {
      data = data.filter((c) =>
        c.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFiltered(data);
  }, [search, filterType, categories]);

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Categories</h1>
          <p className="text-gray-500">Manage all categories</p>
        </div>

        <Button
          onClick={() => setOpenModal(true)}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          + Add Category
        </Button>
      </div>

      {/* Search + Filter */}
      <Card className="p-4 space-y-4">

        <div className="relative">
          <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search categories..."
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          {["all", "product", "recipe"].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-4 py-2 rounded-lg text-sm font-bold ${
                filterType === type
                  ? "bg-green-600 text-white"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

      </Card>

      {/* Table */}
      <Card className="p-4">
        {loading ? (
          <p className="text-center text-gray-400">Loading...</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b">
                <th className="py-3">Name</th>
                <th>Type</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((c) => (
                <tr key={c.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 font-medium">{c.name}</td>

                  {/* 🔥 الحل هنا */}
                  <td className="text-gray-600">
                    {c.type === 1 ? "recipe" : "product"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>

      {/* Modal */}
      <AddCategoryModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        onAdded={fetchData}
      />

    </div>
  );
}