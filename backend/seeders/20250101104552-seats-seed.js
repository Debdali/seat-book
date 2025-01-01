"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    async function truncateTables() {
      try {
        await queryInterface.bulkDelete("seats", null, {});
        console.log("Tables truncated successfully!");
      } catch (error) {
        console.error("Error truncating tables:", error);
      }
    }
    await truncateTables();
    const seats = [];
    const totalRows = 8;
    const seatsPerRow = 7;
    const totalSeats = 56;

    let seatNumber = 1;

    // Generate seat data
    for (let row = 1; row <= totalRows; row++) {
      const rowSeats =
        row === totalRows
          ? totalSeats % seatsPerRow || seatsPerRow
          : seatsPerRow;

      for (let seatNum = 1; seatNum <= rowSeats; seatNum++) {
        seats.push({
          seatNumber: seatNumber,
          rowNumber: row,
          isBooked: false, // All seats are initially available
        });
        seatNumber++;
      }
    }

    // Insert the generated seat data
    await queryInterface.bulkInsert("seats", seats, {});
  },

  down: async (queryInterface, Sequelize) => {
    // Rollback the seed (delete all records)
    await queryInterface.bulkDelete("seats", null, {});
  },
};
