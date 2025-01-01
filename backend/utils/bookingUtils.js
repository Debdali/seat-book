const getAvailableSeatsInRow = (availableSeats, rowNumber) =>
  availableSeats.filter(
    (seat) => seat.rowNumber === rowNumber && !seat.isBooked
  );

const bookSeats = async (seats) => {
  await Promise.all(
    seats.map(async (seat) => {
      seat.isBooked = true;
      await seat.save();
    })
  );
};

module.exports = { getAvailableSeatsInRow, bookSeats };
