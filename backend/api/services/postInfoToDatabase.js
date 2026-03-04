import { prisma } from "#utils/prismaClient";

/**
 * Send spoedaanvraag to the DB
 */
export const postSpoedAanvraag = async (
  requesterId,
  requestedItems,
  departmentId,
  textField,
  requestbatchId,
) => {
  const sendAanvraag = await prisma.request.createMany({});
};
