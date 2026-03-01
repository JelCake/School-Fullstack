-- CreateTable
CREATE TABLE `Category` (
    `categoryId` INTEGER NOT NULL AUTO_INCREMENT,
    `categoryName` VARCHAR(100) NOT NULL,
    `description` TEXT NULL,

    INDEX `Category_categoryId_idx`(`categoryId`),
    PRIMARY KEY (`categoryId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
