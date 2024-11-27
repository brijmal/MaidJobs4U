import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera } from 'lucide-react';
import { getCurrentLocation } from '../utils/location';
import type { UserDetails } from '../types';

export default function Survey() {
  const navigate = useNavigate();
  const [currentAddress, setCurrentAddress] = useState('');
  const [formData, setFormData] = useState<UserDetails>({
    name: '',
    mobile: '',
    age: '',
    languages: '',
    currentAddress: '',
    isSameAddress: true,
    works: [],
  });

  useEffect(() => {
    const getLocation = async () => {
      try {
        const address = await getCurrentLocation();
        setCurrentAddress(address);
        setFormData(prev => ({ ...prev, currentAddress: address }));
      } catch (error) {
        console.error('Error getting location:', error);
      }
    };
    getLocation();
  }, []);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          const maxSize = 500;
          
          let width = img.width;
          let height = img.height;
          
          if (width > height) {
            if (width > maxSize) {
              height *= maxSize / width;
              width = maxSize;
            }
          } else {
            if (height > maxSize) {
              width *= maxSize / height;
              height = maxSize;
            }
          }
          
          canvas.width = width;
          canvas.height = height;
          ctx?.drawImage(img, 0, 0, width, height);
          
          canvas.toBlob((blob) => {
            if (blob) {
              const optimizedFile = new File([blob], file.name, {
                type: 'image/jpeg',
                lastModified: Date.now(),
              });
              setFormData(prev => ({ ...prev, profilePicture: optimizedFile }));
            }
          }, 'image/jpeg', 0.8);
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate form
    if (!formData.name || !formData.mobile || !formData.age || !formData.languages || formData.works.length === 0) {
      alert('Please fill all required fields');
      return;
    }
    if (formData.mobile.length !== 10 || !/^\d+$/.test(formData.mobile)) {
      alert('Please enter a valid 10-digit mobile number');
      return;
    }
    navigate('/thank-you');
  };

  return (
    <div className="min-h-screen p-4">
      <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-200 overflow-hidden">
            {formData.profilePicture ? (
              <img
                src={URL.createObjectURL(formData.profilePicture)}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Camera className="w-8 h-8 text-gray-400" />
              </div>
            )}
          </div>
          <label className="bg-pink-500 text-white px-4 py-2 rounded-full cursor-pointer hover:bg-pink-600 transition-colors">
            Click here to upload your pic / अपनी तस्वीर अपलोड करें
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </label>
        </div>

        {/* Form fields */}
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Name / नाम"
            className="w-full p-2 rounded bg-white/10 text-white border border-white/20"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          />
          
          <input
            type="tel"
            placeholder="Mobile Number / मोबाइल नंबर"
            className="w-full p-2 rounded bg-white/10 text-white border border-white/20"
            value={formData.mobile}
            onChange={(e) => setFormData(prev => ({ ...prev, mobile: e.target.value }))}
          />
          
          <input
            type="number"
            placeholder="Age / उम्र"
            className="w-full p-2 rounded bg-white/10 text-white border border-white/20"
            value={formData.age}
            onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
          />
          
          <input
            type="text"
            placeholder="Languages Known / भाषाएं"
            className="w-full p-2 rounded bg-white/10 text-white border border-white/20"
            value={formData.languages}
            onChange={(e) => setFormData(prev => ({ ...prev, languages: e.target.value }))}
          />

          <div className="space-y-2">
            <p className="text-white">Current Address / वर्तमान पता:</p>
            <p className="text-white/80">{currentAddress}</p>
          </div>

          <div className="space-y-2">
            <p className="text-white">Is the Address same as Current location? / क्या पता वर्तमान स्थान के समान है?</p>
            <div className="space-x-4">
              <label className="text-white">
                <input
                  type="radio"
                  name="sameAddress"
                  checked={formData.isSameAddress}
                  onChange={() => setFormData(prev => ({ ...prev, isSameAddress: true }))}
                /> Yes / हाँ
              </label>
              <label className="text-white">
                <input
                  type="radio"
                  name="sameAddress"
                  checked={!formData.isSameAddress}
                  onChange={() => setFormData(prev => ({ ...prev, isSameAddress: false }))}
                /> No / नहीं
              </label>
            </div>
          </div>

          {!formData.isSameAddress && (
            <div className="space-y-2">
              <input
                type="text"
                placeholder="House No / घर का नंबर"
                className="w-full p-2 rounded bg-white/10 text-white border border-white/20"
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  address: { ...prev.address, houseNo: e.target.value }
                }))}
              />
              <input
                type="text"
                placeholder="Street Name / सड़क का नाम"
                className="w-full p-2 rounded bg-white/10 text-white border border-white/20"
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  address: { ...prev.address, street: e.target.value }
                }))}
              />
              <input
                type="text"
                placeholder="Locality / इलाका"
                className="w-full p-2 rounded bg-white/10 text-white border border-white/20"
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  address: { ...prev.address, locality: e.target.value }
                }))}
              />
              <input
                type="text"
                placeholder="City / शहर"
                className="w-full p-2 rounded bg-white/10 text-white border border-white/20"
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  address: { ...prev.address, city: e.target.value }
                }))}
              />
              <input
                type="text"
                placeholder="Pin Code / पिन कोड"
                className="w-full p-2 rounded bg-white/10 text-white border border-white/20"
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  address: { ...prev.address, pinCode: e.target.value }
                }))}
              />
            </div>
          )}

          <div className="space-y-2">
            <p className="text-white">Household works you can do / घरेलू काम जो आप कर सकते हैं:</p>
            {['Baby Sitting', 'Dish Washing', 'Cloth Washing', 'Sweeping', 'Mopping'].map((work) => (
              <label key={work} className="block text-white">
                <input
                  type="checkbox"
                  checked={formData.works.includes(work)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFormData(prev => ({ ...prev, works: [...prev.works, work] }));
                    } else {
                      setFormData(prev => ({ 
                        ...prev, 
                        works: prev.works.filter(w => w !== work)
                      }));
                    }
                  }}
                /> {work}
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-pink-500 to-blue-500 text-white py-3 rounded-full hover:opacity-90 transition-opacity"
        >
          Submit / जमा करें
        </button>
      </form>
    </div>
  );
}