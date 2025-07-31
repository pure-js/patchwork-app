/**
 * Generates a guaranteed unique ID using a Set to track used IDs
 */
export const generateUniqueId = (existingIds: Set<number>): number => {
  let id: number;
  do {
    id = Math.floor(Math.random() * 1000000);
  } while (existingIds.has(id));
  existingIds.add(id);
  return id;
};
