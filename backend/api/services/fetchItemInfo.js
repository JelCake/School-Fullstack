import { prisma } from "#utils/prismaClient";

//* can be used just to fetch all items inside the db, lets say for searching
//gets the lest of all general info for items
export const fetchAllItem = async () => {
  const allItems = await prisma.items.findMany({
    select: {
      itemId: true,
      itemName: true,
      description: true,
      remainingAmount: true,

      categories: {
        select: {
          categoryName: true,
        },
      },
    },
  });

  if (!allItems || allItems.length === 0) {
    return {
      success: false,
      message: "No items in the DB",
      data: [],
    };
  }

  //needs to user .map, because we are gettin multiple items
  const allItemsFlattend = allItems.map((item) => {
    return {
      itemId: item.itemId,
      itemName: item.itemName,
      description: item.description,
      remainingAmount: item.remainingAmount,
      // Accessing the nested category name
      // (Assuming one item has one category or we take the first one)
      categoryName: item.categories?.categoryName || "Uncategorized",
    };
  });

  return { success: true, message: "Items found", data: allItemsFlattend };
};

const items = await fetchAllItem();
console.log(items.data);

//Get item info of one specific item
export const fetchItemInfo = () => {};
