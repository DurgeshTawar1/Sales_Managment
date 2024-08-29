import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Icon } from 'leaflet';
import axios from 'axios';
import { debounce } from 'lodash';
import 'leaflet/dist/leaflet.css';
import "../styles/AddCustomer.css";
import { toast } from 'react-toastify';
import { createCustomer } from '../Api/CustomerApi';

const AddCustomerForm: React.FC = () => {
    const [location, setLocation] = useState<string>('');
    const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
    const [error, setError] = useState<string | null>(null);

    const debouncedHandleLocationChange = debounce(async (location: string) => {
        setError(null);

        if (location) {
            try {
                const response = await axios.get('https://nominatim.openstreetmap.org/search', {
                    params: {
                        q: location,
                        format: 'json',
                        addressdetails: 1,
                        limit: 1
                    }
                });

                const results = response.data;
                if (results.length > 0) {
                    const { lat, lon } = results[0];
                    setCoords({ lat: parseFloat(lat), lng: parseFloat(lon) });
                } else {
                    setCoords(null);
                    setError('No results found for the given location.');
                }
            } catch (error) {
                console.error('Error fetching coordinates:', error);
                setCoords(null);
                setError('Error fetching coordinates. Please check the location and try again.');
            }
        } else {
            setCoords(null);
        }
    }, 300);

    const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const location = event.target.value;
        setLocation(location);
        debouncedHandleLocationChange(location);
    };
    
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        const form = event.currentTarget;
        const formData = new FormData(form);
    
        // Create a FormData object and append each field
        const customerFormData = new FormData();
    
        // Iterate over the FormData entries and append them to customerFormData
        formData.forEach((value, key) => {
            customerFormData.append(key, value);
        });
    
        try {
            const response = await createCustomer(customerFormData);
            console.log(response);
            
            toast.success('Customer added successfully!');
        } catch (error) {
            toast.error('Failed to add customer. Please try again.');
            console.error('Error adding customer:', error);
            setError('Failed to add customer. Please try again.');
        }
    }
    

    const MapComponent = () => {
        const map = useMap();

        useEffect(() => {
            if (coords) {
                map.setView([coords.lat, coords.lng], 13);
            }
        }, [coords, map]);

        return null;
    };

    return (
        <div className="page-container">
            <div className="form-container">
                <h1 className="form-heading">Add Customer</h1>
                <form className="customer-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Customer Name</label>
                        <input type="text" id="name" name="customerName" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="contact">Customer Contact</label>
                        <input type="number" id="contact" name="customerContact" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="gender">Gender</label>
                        <select id="gender" name="gender" required>
                            <option value="">Select</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Customer Email</label>
                        <input type="email" id="email" name="customerEmail" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="notes">Notes</label>
                        <textarea id="notes" name="notes"></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="advanced-paid">Advanced Paid</label>
                        <input type="number" id="advanced-paid" name="AdvancedPaid" step="0.01" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="discount-rate">Discount Rate</label>
                        <input type="number" id="discount-rate" name="discountRate" step="0.01" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="location">Location</label>
                        <input
                            type="text"
                            id="location"
                            name="location"
                            value={location}
                            onChange={handleLocationChange}
                        />
                    </div>
                    <button type="submit" className="submit-btn">Submit</button>
                </form>
                {error && <p className="error-message">{error}</p>}
            </div>
            <div className="map-container">
                <MapContainer
                    style={{ width: '100%', height: '400px' }}
                    center={coords || { lat: 51.505, lng: -0.09 }}
                    zoom={13}
                >
                    <MapComponent />
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {coords && (
                        <Marker
                            position={coords}
                            icon={new Icon({
                                iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
                                iconSize: [25, 41],
                                iconAnchor: [12, 41],
                                popupAnchor: [1, -34],
                                shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
                                shadowSize: [41, 41],
                            })}
                        >
                            <Popup>{location}</Popup>
                        </Marker>
                    )}
                </MapContainer>
            </div>
        </div>
    );
};

export default AddCustomerForm;
