-- CreateTable
CREATE TABLE `Department` (
    `departmentId` INTEGER NOT NULL AUTO_INCREMENT,
    `departmentName` VARCHAR(100) NOT NULL,

    INDEX `Department_departmentId_idx`(`departmentId`),
    PRIMARY KEY (`departmentId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Request` (
    `requestIndex` INTEGER NOT NULL AUTO_INCREMENT,
    `requestId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,
    `itemId` INTEGER NOT NULL,
    `amountRequested` INTEGER NOT NULL,
    `requestDate` DATETIME(0) NOT NULL,

    INDEX `Request_userId_idx`(`userId`),
    INDEX `Request_itemId_idx`(`itemId`),
    PRIMARY KEY (`requestIndex`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Role` (
    `roleId` INTEGER NOT NULL AUTO_INCREMENT,

    INDEX `Role_roleId_idx`(`roleId`),
    PRIMARY KEY (`roleId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `userId` INTEGER NOT NULL AUTO_INCREMENT,
    `firstName` VARCHAR(100) NOT NULL,
    `lastName` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `pswd` VARCHAR(100) NOT NULL,
    `roleId` INTEGER NOT NULL,
    `departmentId` INTEGER NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    INDEX `User_roleId_idx`(`roleId`),
    INDEX `User_departmentId_idx`(`departmentId`),
    PRIMARY KEY (`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Request` ADD CONSTRAINT `Request_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Request` ADD CONSTRAINT `Request_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `Item`(`itemId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `Role`(`roleId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_departmentId_fkey` FOREIGN KEY (`departmentId`) REFERENCES `Department`(`departmentId`) ON DELETE RESTRICT ON UPDATE CASCADE;
