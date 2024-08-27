import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Icon } from 'leaflet';
import axios from 'axios';
import { debounce } from 'lodash';
import 'leaflet/dist/leaflet.css';
import "../styles/AddCustomer.css";
import { createCustomer } from '../api/customer';


const AddCustomerForm: React.FC = () => {
    const [location, setLocation] = useState<string>('');
    const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const debouncedHandleLocationChange = debounce(async (location: string) => {
        setError(null);

        if (location) {
            try {
                const response = await axios.get(`https://nominatim.openstreetmap.org/search`, {
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

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        setImage(file);
    
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                setImage(base64String); // Save base64 string to state
                setImagePreview(base64String); // Optionally update preview
            };
            reader.readAsDataURL(file); // Convert file to base64 string
        } else {
            setImagePreview(null);
        }
    };
    

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsSubmitting(true);
        setError(null);

        const formData = new FormData(event.target as HTMLFormElement);
        
        const customerData: Customer = {
            customerName: formData.get('name') as string,
            customerContact: parseInt(formData.get('contact') as string),
            gender: formData.get('gender') as string,
            customerEmail: formData.get('email') as string,
            notes: formData.get('notes') as string,
            AdvancedPaid: formData.get('advanced-paid') as string,
            discountRate: formData.get('discount-rate') as string,
            location: location
        }
            

        try {
            const response = await createCustomer(customerData);
            console.log('Customer created:', response.data);
            // Handle successful creation (e.g., show success message, redirect)
        } catch (error) {
            console.error('Error creating customer:', error);
            setError('Failed to create customer. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

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
                        <input type="text" id="name" name="name" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="contact">Customer Contact</label>
                        <input type="text" id="contact" name="contact" required />
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
                        <input type="email" id="email" name="email" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="notes">Notes</label>
                        <textarea id="notes" name="notes"></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="advanced-paid">Advanced Paid</label>
                        <input type="number" id="advanced-paid" name="advanced-paid" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="discount-rate">Discount Rate</label>
                        <input type="number" id="discount-rate" name="discount-rate" step="0.01" />
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
                    <div className="form-group">
                        <label htmlFor="image">Upload Image</label>
                        <input
                            type="file"
                            id="image"
                            name="image"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                        {imagePreview && (
                            <div className="image-preview">
                                <img src={imagePreview} alt="Preview" />
                            </div>
                        )}
                    </div>
                    <button type="submit" className="submit-btn" disabled={isSubmitting}>
                        {isSubmitting ? 'Submitting...' : 'Submit'}
                    </button>
                </form>
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
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default AddCustomerForm;