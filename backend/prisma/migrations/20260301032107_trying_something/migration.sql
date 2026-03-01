-- CreateTable
CREATE TABLE `Item` (
    `itemId` INTEGER NOT NULL AUTO_INCREMENT,
    `itemName` VARCHAR(100) NOT NULL,
    `remainingAmount` INTEGER NOT NULL DEFAULT 0,
    `categoryId` INTEGER NOT NULL,

    INDEX `Item_categoryId_idx`(`categoryId`),
    PRIMARY KEY (`itemId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Item` ADD CONSTRAINT `Item_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`categoryId`) ON DELETE RESTRICT ON UPDATE CASCADE;
