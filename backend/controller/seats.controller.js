const Seat = require('../models/seats.model.js'); // Import Seat model from Sequelize
const { getAvailableSeatsInRow, bookSeats } = require('../utils/bookingUtils');

// Validate seat booking input
const validateBookingInput = (numOfSeats) => {
    if (numOfSeats > 7) {
        throw new Error('Cannot book more than 7 seats');
    }
    if (numOfSeats < 1) {
        throw new Error('Number of seats must be at least 1');
    }
};

// Find seats in nearby rows
const findNearbyRows = (rowSeatCounts, numOfSeats) => {
    let minLength = Infinity;
    let [start, end] = [0, 0];
    let sum = 0;

    for (let right = 0; right < rowSeatCounts.length; right++) {
        sum += rowSeatCounts[right];
        while (sum >= numOfSeats) {
            const length = right - start + 1;
            if (length < minLength) {
                minLength = length;
                [end, start] = [right, start];
            }
            sum -= rowSeatCounts[start++];
        }
    }

    return { start, end };
};

// Controller function to book seats
const bookingController = async (req, res) => {
    const { numOfSeats } = req.body;
    const rowCount = 12;

    try {
        validateBookingInput(numOfSeats);

        // Fetch available seats sorted by rowNumber and seatNumber
        const availableSeats = await Seat.findAll({
            where: { isBooked: false },
            order: [['rowNumber', 'ASC'], ['seatNumber', 'ASC']],
        });

        if (availableSeats.length < numOfSeats) {
            return res.status(400).json({
                success: false,
                message: `Booking failed, only ${availableSeats.length} seats are available.`,
            });
        }

        for (let row = 1; row <= rowCount; row++) {
            const availableRowSeats = getAvailableSeatsInRow(availableSeats, row);
            if (availableRowSeats.length >= numOfSeats) {
                const seatsToBook = availableRowSeats.slice(0, numOfSeats);
                await bookSeats(seatsToBook);
                return res.status(200).json({ success: true, data: seatsToBook });
            }
        }

        const rowSeatCounts = Array.from({ length: rowCount }, (_, row) =>
            getAvailableSeatsInRow(availableSeats, row + 1).length
        );

        const { start, end } = findNearbyRows(rowSeatCounts, numOfSeats);

        const nearbySeats = [];
        for (let row = start + 1; row <= end + 1; row++) {
            nearbySeats.push(...getAvailableSeatsInRow(availableSeats, row));
        }

        const seatsToBook = nearbySeats.slice(0, numOfSeats);
        await bookSeats(seatsToBook);

        if (seatsToBook.length > 0) {
            return res.status(200).json({ success: true, data: seatsToBook });
        }

        return res.status(400).json({ success: false, message: 'Booking failed' });
    } catch (error) {
        console.error('Booking Error:', error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Controller function to get all seats
const getSeats = async (req, res) => {
    try {
        const availableSeats = await Seat.findAll({
            order: [['rowNumber', 'ASC'], ['seatNumber', 'ASC']],
        });
        res.status(200).json({ success: true, availableSeats });
    } catch (error) {
        console.error('Error fetching seats:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// Reset all seats
const resetSeatsController = async (req, res) => {
    try {
        await Seat.destroy({ where: {} });

        const totalRows = 12;
        const seatsPerRow = 7;
        const totalSeats = 80;

        const seats = [];
        let seatNumber = 1;

        for (let row = 1; row <= totalRows; row++) {
            const rowSeats = row === totalRows
                ? totalSeats % seatsPerRow || seatsPerRow
                : seatsPerRow;

            for (let seatNum = 1; seatNum <= rowSeats; seatNum++) {
                seats.push({
                    seatNumber,
                    rowNumber: row,
                    isBooked: false,
                });
                seatNumber++;
            }
        }

        await Seat.bulkCreate(seats);

        res.status(200).json({ success: true, message: 'Seats successfully reset' });
    } catch (error) {
        console.error('Error resetting seats:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

module.exports = { bookingController, resetSeatsController, getSeats };
