-- DropIndex
DROP INDEX `Size_productId_fkey` ON `size`;

-- CreateTable
CREATE TABLE `Extra` (
    `id` VARCHAR(191) NOT NULL,
    `name` ENUM('CHEESE', 'BACON', 'TOMATO', 'ONION', 'PEPPER') NOT NULL,
    `price` DOUBLE NOT NULL,
    `productId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Size` ADD CONSTRAINT `Size_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Extra` ADD CONSTRAINT `Extra_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
