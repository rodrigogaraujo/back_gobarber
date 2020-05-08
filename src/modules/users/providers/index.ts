import { container } from "tsyringe";
import IHashProvider from "./HashProvider/modules/IHashProvider";
import BCryptHahsProvider from "./HashProvider/implementations/BCriptHashProvider";

container.registerSingleton<IHashProvider>("HashProvider", BCryptHahsProvider);
