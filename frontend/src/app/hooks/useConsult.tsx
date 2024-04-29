import axios, { AxiosResponse } from "axios";
import { useState } from "react";

export type MethodType = "GET" | "PATCH" | "POST" | "PUT" | "DELETE";

export function useConsult<TypeResponse>(host: string) {
  const [data, setData] = useState<TypeResponse | null>(null);
  const [load, setLoad] = useState(false);
  const [mssg, setMssg] = useState<string | null>(null);

  function resetAll(): void {
    setData(null);
    setMssg(null);
  }

  async function consult<TypeBody>(
    url: string,
    method: MethodType,
    body: TypeBody | null = null
  ) {
    try {
      setLoad(true);
      const res: AxiosResponse<TypeResponse> = await axios.request({
        url: host + url,
        method: method,
        data: method == "GET" ? null : body,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setData(res.data);
    } catch (error: any) {
      console.log(error)
      if (error.response) {
        setMssg(error.response.error);
      }
    } finally {
      setLoad(false);
    }
  }

  return {
    data,
    consult,
    load,
    mssg,
    resetAll,
    setData
  };
}
