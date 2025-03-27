import { getBooking } from '../controllers/bookingController.js';
import db from "../config/db.js";

jest.mock('../config/db.js', () => ({
  query: jest.fn(),
}));

describe("Booking Controller Tests", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return list of bookings", async () => {
    const req = {};
    const res = {
      json: jest.fn(),
    };

    const mockBookings = [
      { id: 1, customer_name: 'akshay', booking_date: '2025-03-25', status: 'Confirmed' },
      { id: 2, customer_name: 'ajay', booking_date: '2025-03-26', status: 'Pending' },
    ];

    db.query.mockImplementation((query, callback) => {
      callback(null, mockBookings);
    });

    await getBooking(req, res);
    expect(res.json).toHaveBeenCalledWith({ data: mockBookings });
  });

  it("should handle error when fetching bookings", async () => {
    const req = {};
    const res = {
      json: jest.fn(),
    };

    db.query.mockImplementation((query, callback) => {
      callback(new Error("Error retrieving bookings"));
    });

    await getBooking(req, res);
    expect(res.json).toHaveBeenCalledWith({ message: "Error retrieving bookings" });
  });
});