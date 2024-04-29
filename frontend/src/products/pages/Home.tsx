import { ChangeEvent, useEffect, useState } from "react";
import { useConsult } from "../../app/hooks/useConsult";
import { Loading } from "../../app/components/Loading";
import { Link } from "react-router-dom";

export function Home() {
  const [searchItem, setSearchItem] = useState("");
  const { data, consult, load, mssg, resetAll } = useConsult<ApiResponse>(
    "https://dummyjson.com"
  );

  useEffect(() => {
    consult("/products/?limit=6", "GET");
  }, []);

  function handleChangeSearch(e: ChangeEvent<HTMLInputElement>) {
    setSearchItem(e.target.value);
  }

  function searchAction() {
    resetAll();
    consult(`/products/search?q=${searchItem}&limit=6`, "GET");
  }

  return (
    <section className="w-[80%] mx-auto max-w-[800px]">
      <Loading loading={load} />
      <h2 className="text-2xl font-semibold my-[50px]">Products</h2>

      <section className="max-w-md mx-auto mt-[90px] mb-[80px]">
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            value={searchItem}
            onChange={handleChangeSearch}
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search Mockups, Logos..."
          />
          <button
            onClick={searchAction}
            className={`text-white absolute end-2.5 bottom-2.5 bg-black ${
              searchItem === "" && "opacity-50 pointer-events-none"
            } focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2`}
          >
            Search
          </button>
        </div>
      </section>

      {data !== null && data?.products.length > 0 ? (
        <section className="grid justify-items-center gap-[20px] grid-cols-2 md:grid-cols-3">
          {data?.products.map((product) => {
            return (
              <Link to={`/product/${product.id}`} key={product.id} className="space-y-[5px] transition-all hover:opacity-75 relative">
                <img
                  className="h-[150px] object-cover bg-gray-300 w-[150px] rounded-[8px]"
                  src={product.thumbnail}
                  alt={product.title}
                />
                <p className="text-md">{product.title}</p>
                <p className="text-sm font-semibold">$ {product.price}</p>
              </Link>
            );
          })}
          <img src="" alt="" />
          <section>
            <div className="w-[5px] h-[5px] "></div>
          </section>
        </section>
      ) : (
        <h1 className="font-semibold text-center text-lg">product not found</h1>
      )}
    </section>
  );
}
