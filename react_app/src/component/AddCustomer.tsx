
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Icon } from 'leaflet';
import axios from 'axios';
import { debounce } from 'lodash';
import 'leaflet/dist/leaflet.css';
import "../styles/AddCustomer.css";
import { toast } from 'react-toastify';
import { createCustomer, CustomerFormData } from '../Api/CustomerApi';

const AddCustomerForm: React.FC = () => {
    const [location, setLocation] = useState<string>('');
    const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState<CustomerFormData>({
        customerName: '',
        customerContact: '',
        gender: '',
        customerEmail: '',
        notes: '',
        AdvancedPaid: '',
        discountRate: '',
        location: '',
    });

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

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        try {
            const response = await createCustomer(formData);
            console.log(response);
            
            toast.success('Customer added successfully!');
            // Reset form after successful submission
            setFormData({
                customerName: '',
                customerContact: '',
                gender: '',
                customerEmail: '',
                notes: '',
                AdvancedPaid: '',
                discountRate: '',
                location: '',
            });
            setLocation('');
            setCoords(null);
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
                        <label htmlFor="customerName">Customer Name</label>
                        <input 
                            type="text" 
                            id="customerName" 
                            name="customerName" 
                            value={formData.customerName}
                            onChange={handleInputChange}
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="customerContact">Customer Contact</label>
                        <input 
                            type="tel" 
                            id="customerContact" 
                            name="customerContact" 
                            value={formData.customerContact}
                            onChange={handleInputChange}
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="gender">Gender</label>
                        <select 
                            id="gender" 
                            name="gender" 
                            value={formData.gender}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">Select</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="customerEmail">Customer Email</label>
                        <input 
                            type="email" 
                            id="customerEmail" 
                            name="customerEmail" 
                            value={formData.customerEmail}
                            onChange={handleInputChange}
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="notes">Notes</label>
                        <textarea 
                            id="notes" 
                            name="notes"
                            value={formData.notes}
                            onChange={handleInputChange}
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="AdvancedPaid">Advanced Paid</label>
                        <input 
                            type="number" 
                            id="AdvancedPaid" 
                            name="AdvancedPaid" 
                            value={formData.AdvancedPaid}
                            onChange={handleInputChange}
                            step="0.01" 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="discountRate">Discount Rate</label>
                        <input 
                            type="number" 
                            id="discountRate" 
                            name="discountRate" 
                            value={formData.discountRate}
                            onChange={handleInputChange}
                            step="0.01" 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="location">Location</label>
                        <input
                            type="text"
                            id="location"
                            name="location"
                            value={formData.location}
                            onChange={(e) => {
                                handleInputChange(e);
                                setLocation(e.target.value);
                                debouncedHandleLocationChange(e.target.value);
                            }}
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