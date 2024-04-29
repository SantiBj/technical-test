import { Link, useParams } from "react-router-dom";
import { useConsult } from "../../app/hooks/useConsult";
import { useEffect } from "react";
import { Loading } from "../../app/components/Loading";
import { GrFormPreviousLink } from "react-icons/gr";

export function Product() {
  const { productId } = useParams();
  const { data, consult, load, mssg } = useConsult<ProductType>(
    "https://dummyjson.com"
  );

  useEffect(() => {
    consult(`/products/${productId}`, "GET");
  }, []);

  return (
    <section className="max-w-[800px] mx-auto flex flex-col justify-center md:min-h-screen items-center">
      <Loading loading={load} />
      <section className="space-y-[15px]">
        <section className="relative">
          <img
            className="w-full h-full max-w-[600px] max-h-[500px] mx-auto object-contain bg-gray-100"
            src={data?.thumbnail}
            alt={data?.title}
          />
          <div className="absolute top-6 left-6 bg-white rounded-full p-[8px]">
            <Link className="font-semibold hover:opacity-75" to="/">
              <GrFormPreviousLink size={30} />
            </Link>
          </div>
        </section>

        <section className="w-[80%] mx-auto space-y-[10px]">
          <h3 className="font-bold text-xl">{data?.title}</h3>
          <div className="flex items-center gap-[10px] text-sm">
            <p className="font-semibold">Rp. 2.000.000</p>
            <p className="font-semibold bg-gray-200 rounded-[16px] px-[8px]">
              20% OFF
            </p>
          </div>
          <div className="flex justify-between text-sm">
            <div className="flex gap-[10px] items-center">
              <p className="font-semibold text-gray-500">1,200 Sold</p>
              <p className="font-semibold bg-gray-200 rounded-[10px] px-[8px]">
                4,8
              </p>
            </div>
            <div></div>
          </div>

          <section className="space-y-[10px] mt-[20px]">
            <h4 className="font-semibold text-lg">Description</h4>
            <p>{data?.description}</p>
          </section>
        </section>
      </section>
    </section>
  );
}
