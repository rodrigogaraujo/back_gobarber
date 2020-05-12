import { container } from "tsyringe";
import DiskStorageProvider from "./StoredProvider/implementations/DiskStorageProvider";
import IStorageProvider from "./StoredProvider/models/IStorageProvider";

import IMailProvider from "./MailProvider/models/IMailProvider";
import EtherialMailProvider from "./MailProvider/implementations/EtherialMailProvider";

import IMailTemplateProvider from "./MailTemplateProvider/models/IMailTemplateProvider";
import HandlebarMailTemplateProvider from "./MailTemplateProvider/implementations/HandlebarMailTemplateProvider";

container.registerSingleton<IMailTemplateProvider>(
    "MailTemplateProvider",
    HandlebarMailTemplateProvider,
);

container.registerSingleton<IStorageProvider>(
    "StorageProvider",
    DiskStorageProvider,
);

container.registerInstance<IMailProvider>(
    "MailProvider",
    container.resolve(EtherialMailProvider),
);
