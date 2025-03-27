import { createPayment, getPayments, updatePayment, deletePayment } from '../controllers/paymentController.js';
import db from "../config/db.js";

jest.mock('../config/db.js', () => ({
  query: jest.fn(),
}));

describe("Payment Controller Tests", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create a payment successfully", async () => {
    const req = {
      body: {
        booking_id: 1,
        payment_date: '2025-03-25',
        payment_method: 'Credit Card',
        payment_status: 'Completed',
      },
    };
    const res = {
      json: jest.fn(),
    };

    db.query.mockImplementation((query, values, callback) => {
      callback(null);
    });

    await createPayment(req, res);
    expect(res.json).toHaveBeenCalledWith({ message: "Payment created successfully" });
  });

  it("should handle error when creating payment", async () => {
    const req = {
      body: {
        booking_id: 1,
        payment_date: '2025-03-25',
        payment_method: 'Credit Card',
        payment_status: 'Completed',
      },
    };
    const res = {
      json: jest.fn(),
    };

    db.query.mockImplementation((query, values, callback) => {
      callback(new Error("Error creating payment"));
    });

    await createPayment(req, res);
    expect(res.json).toHaveBeenCalledWith({ message: "Error creating payment" });
  });

  it("should return list of payments", async () => {
    const req = {};
    const res = {
      json: jest.fn(),
    };

    const mockPayments = [
      { id: 1, booking_id: 1, payment_date: '2025-03-25', payment_method: 'Credit Card', payment_status: 'Completed' },
      { id: 2, booking_id: 2, payment_date: '2025-03-26', payment_method: 'PayPal', payment_status: 'Pending' },
    ];

    db.query.mockImplementation((query, callback) => {
      callback(null, mockPayments);
    });

    await getPayments(req, res);
    expect(res.json).toHaveBeenCalledWith({ data: mockPayments });
  });

  it("should handle error when fetching payments", async () => {
    const req = {};
    const res = {
      json: jest.fn(),
    };

    db.query.mockImplementation((query, callback) => {
      callback(new Error("Error retrieving payments"));
    });

    await getPayments(req, res);
    expect(res.json).toHaveBeenCalledWith({ message: "Error retrieving payments" });
  });

  it("should update a payment successfully", async () => {
    const req = {
      params: { id: 1 },
      body: {
        booking_id: 1,
        payment_date: '2025-03-25',
        payment_method: 'Credit Card',
        payment_status: 'Completed',
      },
    };
    const res = {
      json: jest.fn(),
    };

    db.query.mockImplementation((query, values, callback) => {
      callback(null);
    });

    await updatePayment(req, res);
    expect(res.json).toHaveBeenCalledWith({ message: "Payment updated successfully" });
  });

  it("should handle error when updating payment", async () => {
    const req = {
      params: { id: 1 },
      body: {
        booking_id: 1,
        payment_date: '2025-03-25',
        payment_method: 'Credit Card',
        payment_status: 'Completed',
      },
    };
    const res = {
      json: jest.fn(),
    };

    db.query.mockImplementation((query, values, callback) => {
      callback(new Error("Error updating payment"));
    });

    await updatePayment(req, res);
    expect(res.json).toHaveBeenCalledWith({ message: "Error updating payment" });
  });

  it("should delete a payment successfully", async () => {
    const req = {
      params: { id: 1 },
    };
    const res = {
      json: jest.fn(),
    };

    db.query.mockImplementation((query, values, callback) => {
      callback(null);
    });

    await deletePayment(req, res);
    expect(res.json).toHaveBeenCalledWith({ message: "Payment deleted successfully" });
  });

  it("should handle error when deleting payment", async () => {
    const req = {
      params: { id: 1 },
    };
    const res = {
      json: jest.fn(),
    };

    db.query.mockImplementation((query, values, callback) => {
      callback(new Error("Error deleting payment"));
    });

    await deletePayment(req, res);
    expect(res.json).toHaveBeenCalledWith({ message: "Error deleting payment" });
  });
});
