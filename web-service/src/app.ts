import {
  APIService,
  ExpressStandardConfiguration,
  ITRMAPIServiceGlobal,
} from "itrm-tools";

import { authRouter } from "./routes/authRoute";
import { productsRouter } from "./routes/productsRoute";

const service = new APIService({
  name: "backend",
  port: 3000,
  express: new ExpressStandardConfiguration(),
});

ITRMAPIServiceGlobal.whitelist = ["http://localhost:3000","http://localhost:5173"]


service.init();
service.addRouter(authRouter);
service.addRouter(productsRouter);
service.enableDocumentation();
service
  .run(() => {})
  .then((response) => {
    console.log("Servidor iniciado correctamente:", response.message);
  })
  .catch((error) => {
    console.error("Error al iniciar el servidor:", error);
  });

