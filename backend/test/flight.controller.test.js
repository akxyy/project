import { createFlight, getFlights, updateFlight, deleteFlight } from '../controllers/flightsController.js';
import db from '../config/db.js';

jest.mock('../config/db.js');

describe('Flight Controller', () => {
    beforeEach(() => {
        db.query.mockClear();
    });

    it('should create a flight successfully', async () => {
        db.query.mockImplementation((query, values, callback) => {
            callback(null);
        });

        const req = {
            body: {
                destination_id: 1,
                airline_name: 'Airline A',
                price: 300,
                departure_time: '2025-05-01 10:00:00',
                arrival_time: '2025-05-01 12:00:00',
                duration: '2h',
            },
        };

        const res = {
            json: jest.fn(),
        };

        await createFlight(req, res);

        expect(res.json).toHaveBeenCalledWith({ message: 'Flight created successfully' });
    });

    it('should return an error when creating a flight', async () => {
        db.query.mockImplementation((query, values, callback) => {
            callback(new Error('Database error'));
        });

        const req = {
            body: {
                destination_id: 1,
                airline_name: 'Airline A',
                price: 300,
                departure_time: '2025-05-01 10:00:00',
                arrival_time: '2025-05-01 12:00:00',
                duration: '2h',
            },
        };

        const res = {
            json: jest.fn(),
        };

        await createFlight(req, res);

        expect(res.json).toHaveBeenCalledWith({ message: 'Error creating flight' });
    });

    it('should retrieve all flights successfully', async () => {
        const mockResults = [
            { id: 1, destination_id: 1, airline_name: 'Airline A', price: 300, departure_time: '2025-05-01 10:00:00', arrival_time: '2025-05-01 12:00:00', duration: '2h' },
            { id: 2, destination_id: 2, airline_name: 'Airline B', price: 400, departure_time: '2025-05-02 11:00:00', arrival_time: '2025-05-02 13:00:00', duration: '2h' }
        ];
        db.query.mockImplementation((query, callback) => {
            callback(null, mockResults);
        });

        const req = {};
        const res = {
            json: jest.fn(),
        };

        await getFlights(req, res);

        expect(res.json).toHaveBeenCalledWith({ data: mockResults });
    });

    it('should return an error when retrieving flights', async () => {
        db.query.mockImplementation((query, callback) => {
            callback(new Error('Database error'));
        });

        const req = {};
        const res = {
            json: jest.fn(),
        };

        await getFlights(req, res);

        expect(res.json).toHaveBeenCalledWith({ message: 'Error retrieving flights' });
    });

    it('should update a flight successfully', async () => {
        db.query.mockImplementation((query, values, callback) => {
            callback(null);
        });

        const req = {
            params: { id: 1 },
            body: {
                destination_id: 2,
                airline_name: 'Airline C',
                price: 500,
                departure_time: '2025-05-03 09:00:00',
                arrival_time: '2025-05-03 11:00:00',
                duration: '2h',
            },
        };

        const res = {
            json: jest.fn(),
        };

        await updateFlight(req, res);

        expect(res.json).toHaveBeenCalledWith({ message: 'Flight updated successfully' });
    });

    it('should return an error when updating a flight', async () => {
        db.query.mockImplementation((query, values, callback) => {
            callback(new Error('Database error'));
        });

        const req = {
            params: { id: 1 },
            body: {
                destination_id: 2,
                airline_name: 'Airline C',
                price: 500,
                departure_time: '2025-05-03 09:00:00',
                arrival_time: '2025-05-03 11:00:00',
                duration: '2h',
            },
        };

        const res = {
            json: jest.fn(),
        };

        await updateFlight(req, res);

        expect(res.json).toHaveBeenCalledWith({ message: 'Error updating flight' });
    });

    it('should delete a flight successfully', async () => {
        db.query.mockImplementation((query, values, callback) => {
            callback(null);
        });

        const req = {
            params: { id: 1 },
        };

        const res = {
            json: jest.fn(),
        };

        await deleteFlight(req, res);

        expect(res.json).toHaveBeenCalledWith({ message: 'Flight deleted successfully' });
    });

    it('should return an error when deleting a flight', async () => {
        db.query.mockImplementation((query, values, callback) => {
            callback(new Error('Database error'));
        });

        const req = {
            params: { id: 1 },
        };

        const res = {
            json: jest.fn(),
        };

        await deleteFlight(req, res);

        expect(res.json).toHaveBeenCalledWith({ message: 'Error deleting flight' });
    });
});