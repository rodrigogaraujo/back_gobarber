import { container } from "tsyringe";
import DiskStorageProvider from "./StoredProvider/implementations/DiskStorageProvider";
import IStorageProvider from "./StoredProvider/models/IStorageProvider";

import IMailProvider from "./MailProvider/models/IMailProvider";
import EtherialMailProvider from "./MailProvider/implementations/EtherialMailProvider";

container.registerInstance<IMailProvider>(
    "MailProvider",
    new EtherialMailProvider(),
);

container.registerSingleton<IStorageProvider>(
    "StorageProvider",
    DiskStorageProvider,
);
