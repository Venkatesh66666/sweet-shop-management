import { db } from "../../config/database";

/*
 Purchase a sweet
 Decreases quantity by 1 if stock > 0
*/

export const purchaseSweetService = (
  sweetId: number,
  purchaseQty: number
): Promise<number> => {
  return new Promise((resolve) => {
    db.get(
      "SELECT quantity FROM sweets WHERE id = ?",
      [sweetId],
      (_err, row: any) => {
        const currentQty = row?.quantity ?? 0;
        const newQty = currentQty - purchaseQty;

        db.run(
          "UPDATE sweets SET quantity = ? WHERE id = ?",
          [newQty, sweetId],
          () => {
            resolve(newQty);
          }
        );
      }
    );
  });
};



/*
 Restock a sweet
 Increases quantity by given amount
*/
export const restockSweetService = (
  sweetId: number,
  amount: number
): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.run(
      `
      UPDATE sweets
      SET quantity = quantity + ?
      WHERE id = ?
      `,
      [amount, sweetId],
      function (err) {
        if (err) return reject(err);
        resolve();
      }
    );
  });
};
