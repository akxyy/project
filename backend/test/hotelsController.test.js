import { getHotel, createHotel, updateHotel, deleteHotel } from '../controllers/hotelsController.js';
import db from '../config/db.js';

jest.mock('../config/db.js');

describe('Hotel Controller', () => {
  beforeEach(() => {
    db.query.mockClear();
  });

  it('should retrieve all hotels successfully', async () => {
    const mockResults = [
      { id: 1, name: 'Hotel A', price_per_night: 100, destination_id: 1, amenities: 'Pool' },
      { id: 2, name: 'Hotel B', price_per_night: 150, destination_id: 2, amenities: 'Spa' }
    ];
    db.query.mockImplementation((query, callback) => {
      callback(null, mockResults);
    });

    const req = {};
    const res = { json: jest.fn() };

    await getHotel(req, res);

    expect(res.json).toHaveBeenCalledWith({ data: mockResults });
  });

  it('should return an error when retrieving hotels', async () => {
    db.query.mockImplementation((query, callback) => {
      callback(new Error('Database error'));
    });

    const req = {};
    const res = { json: jest.fn() };

    await getHotel(req, res);

    expect(res.json).toHaveBeenCalledWith({ message: 'Error retrieving hotels' });
  });

  it('should create a hotel successfully', async () => {
    db.query.mockImplementation((query, values, callback) => {
      callback(null);
    });

    const req = {
      body: {
        id: 1,
        name: 'Hotel A',
        price_per_night: 100,
        destination_id: 1,
        amenities: 'Pool',
      },
    };
    const res = { json: jest.fn() };

    await createHotel(req, res);

    expect(res.json).toHaveBeenCalledWith({ message: 'Hotel created successfully' });
  });

  it('should return an error when creating a hotel', async () => {
    db.query.mockImplementation((query, values, callback) => {
      callback(new Error('Database error'));
    });

    const req = {
      body: {
        id: 1,
        name: 'Hotel A',
        price_per_night: 100,
        destination_id: 1,
        amenities: 'Pool',
      },
    };
    const res = { json: jest.fn() };

    await createHotel(req, res);

    expect(res.json).toHaveBeenCalledWith({ message: 'Error creating hotel' });
  });

  it('should update a hotel successfully', async () => {
    db.query.mockImplementation((query, values, callback) => {
      callback(null);
    });

    const req = {
      params: { id: 1 },
      body: {
        name: 'Hotel A Updated',
        price_per_night: 120,
        destination_id: 1,
        amenities: 'Pool, Gym',
      },
    };
    const res = { json: jest.fn() };

    await updateHotel(req, res);

    expect(res.json).toHaveBeenCalledWith({ message: 'Hotel updated successfully' });
  });

  it('should return an error when updating a hotel', async () => {
    db.query.mockImplementation((query, values, callback) => {
      callback(new Error('Database error'));
    });

    const req = {
      params: { id: 1 },
      body: {
        name: 'Hotel A Updated',
        price_per_night: 120,
        destination_id: 1,
        amenities: 'Pool, Gym',
      },
    };
    const res = { json: jest.fn() };

    await updateHotel(req, res);

    expect(res.json).toHaveBeenCalledWith({ message: 'Error updating hotel' });
  });

  it('should delete a hotel successfully', async () => {
    db.query.mockImplementation((query, values, callback) => {
      callback(null);
    });

    const req = { params: { id: 1 } };
    const res = { json: jest.fn() };

    await deleteHotel(req, res);

    expect(res.json).toHaveBeenCalledWith({ message: 'Hotel deleted successfully' });
  });

  it('should return an error when deleting a hotel', async () => {
    db.query.mockImplementation((query, values, callback) => {
      callback(new Error('Database error'));
    });

    const req = { params: { id: 1 } };
    const res = { json: jest.fn() };

    await deleteHotel(req, res);

    expect(res.json).toHaveBeenCalledWith({ message: 'Error deleting hotel' });
  });
});
