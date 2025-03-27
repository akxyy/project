import { createDestination, getDestinations, updateDestination, deleteDestination } from '../controllers/destinationsController.js';
import db from "../config/db.js";

jest.mock('../config/db.js', () => ({
  query: jest.fn(),
}));

describe("Destination Controller Tests", () => {
  afterEach(() => {
    jest.clearAllMocks(); 
  })

  it("should create a destination successfully", async () => {
    const req = {
      body: {
        name: "Paris",
        country: "France",
        description: "The city of lights",
        image_url: "http://image.com/paris.jpg",
      },
    };
    const res = {
      json: jest.fn(),
    };

    db.query.mockImplementation((query, values, callback) => {
      callback(null);
    });

    await createDestination(req, res);
    expect(res.json).toHaveBeenCalledWith({ message: "Destination created successfully" });
  });

  it("should handle error when creating destination", async () => {
    const req = {
      body: {
        name: "Paris",
        country: "France",
        description: "The city of lights",
        image_url: "http://image.com/paris.jpg",
      },
    };
    const res = {
      json: jest.fn(),
    };

    db.query.mockImplementation((query, values, callback) => {
      callback(new Error("Error creating destination")); 
    });

    await createDestination(req, res);
    expect(res.json).toHaveBeenCalledWith({ message: "Error creating destination" });
  });

  it("should return list of destinations", async () => {
    const req = {};
    const res = {
      json: jest.fn(),
    };

    const mockDestinations = [
      { id: 1, name: "Paris", country: "France", description: "City of Lights", image_url: "url1" },
      { id: 2, name: "New York", country: "USA", description: "The Big Apple", image_url: "url2" },
    ];

    db.query.mockImplementation((query, callback) => {
      callback(null, mockDestinations);
    });

    await getDestinations(req, res);
    expect(res.json).toHaveBeenCalledWith({ data: mockDestinations });
  });

  it("should handle error when fetching destinations", async () => {
    const req = {};
    const res = {
      json: jest.fn(),
    };

    db.query.mockImplementation((query, callback) => {
      callback(new Error("Error fetching destinations"));
    });

    await getDestinations(req, res);
    expect(res.json).toHaveBeenCalledWith({ err: expect.any(Error) });
  });

  it("should update a destination successfully", async () => {
    const req = {
      params: { id: 1 },
      body: {
        name: "Paris Updated",
        country: "France",
        description: "Updated city of lights",
        image_url: "http://image.com/paris_updated.jpg",
      },
    };
    const res = {
      json: jest.fn(),
    };

    db.query.mockImplementation((query, values, callback) => {
      callback(null);
    });

    await updateDestination(req, res);
    expect(res.json).toHaveBeenCalledWith({ message: "Destination updated successfully" });
  });

  it("should handle error when updating destination", async () => {
    const req = {
      params: { id: 1 },
      body: {
        name: "Paris Updated",
        country: "France",
        description: "Updated city of lights",
        image_url: "http://image.com/paris_updated.jpg",
      },
    };
    const res = {
      json: jest.fn(),
    };

    db.query.mockImplementation((query, values, callback) => {
      callback(new Error("Error updating destination"));
    });

    await updateDestination(req, res);
    expect(res.json).toHaveBeenCalledWith({ message: "Error updating destination" });
  });

  it("should delete a destination successfully", async () => {
    const req = {
      params: { id: 1 },
    };
    const res = {
      json: jest.fn(),
    };

    db.query.mockImplementation((query, values, callback) => {
      callback(null); 
    });

    await deleteDestination(req, res);
    expect(res.json).toHaveBeenCalledWith({ message: "Destination deleted successfully" });
  });

  it("should handle error when deleting destination", async () => {
    const req = {
      params: { id: 1 },
    };
    const res = {
      json: jest.fn(),
    };

    db.query.mockImplementation((query, values, callback) => {
      callback(new Error("Error deleting destination"));
    });

    await deleteDestination(req, res);
    expect(res.json).toHaveBeenCalledWith({ message: "Error deleting destination" });
  });
});