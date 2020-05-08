import { container } from "tsyringe";
import DiskStorageProvider from "./StoredProvider/implementations/DiskStorageProvider";
import IStorageProvider from "./StoredProvider/models/IStorageProvider";

container.registerSingleton<IStorageProvider>(
    "StorageProvider",
    DiskStorageProvider,
);
