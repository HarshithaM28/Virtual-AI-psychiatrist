// MeetUs.js
import React, { useState } from 'react';



function MeetUs() {
  // Group psychiatrists by city
  const psychiatristsByCity = {
    'Mumbai, Maharashtra': [
      {
        name: 'Dr. Anjali Sharma',
        location: 'Mumbai, Maharashtra',
        contact: '+91 98765 43210',
        address: 'Nanavati Super Speciality Hospital, S.V. Road, Vile Parle West, Mumbai, Maharashtra 400056',
      },
      {
        name: 'Dr. Sameer Patel',
        location: 'Mumbai, Maharashtra',
        contact: '+91 98765 43211',
        address: 'Jagruti Rehabilitation Centre, Near Shivaji Talao, Tank Road, Bhandup West, Mumbai, Maharashtra 400078',
      },
      {
        name: 'Dr. Neha Kulkarni',
        location: 'Mumbai, Maharashtra',
        contact: '+91 98765 43212',
        address: 'L.T.M.G.H. (Sion Hospital), Dr. Babasaheb Ambedkar Road, Sion West, Mumbai, Maharashtra 400022',
      },
      {
        name: 'Dr. Arjun Deshmukh',
        location: 'Mumbai, Maharashtra',
        contact: '+91 98765 43213',
        address: 'KEM Hospital, Acharya Donde Marg, Parel East, Mumbai, Maharashtra 400012',
      },
      {
        name: 'Dr. Riya Mehta',
        location: 'Mumbai, Maharashtra',
        contact: '+91 98765 43214',
        address: 'Dr. Mohit’s Resilience Clinic, 603, Aura Biplex Senate, S.V. Road, Borivali West, Mumbai, Maharashtra 400092',
      },
    ],
    'Delhi': [
      {
        name: 'Dr. Vikram Singh',
        location: 'Delhi',
        contact: '+91 91234 56789',
        address: 'Tulasi Psychiatric & Rehab Centre, 298, Mehrauli-Gurgaon Road, Sultanpur, New Delhi, Delhi 110030',
      },
      {
        name: 'Dr. Kavita Rana',
        location: 'Delhi',
        contact: '+91 91234 56790',
        address: 'Institute of Human Behaviour and Allied Sciences (IHBAS), Dilshad Garden, New Delhi, Delhi 110095',
      },
      {
        name: 'Dr. Arnav Gupta',
        location: 'Delhi',
        contact: '+91 91234 56791',
        address: 'Fortis Hospital, A Block, Shalimar Bagh, New Delhi, Delhi 110088',
      },
      {
        name: 'Dr. Shalini Verma',
        location: 'Delhi',
        contact: '+91 91234 56792',
        address: 'BLK Super Speciality Hospital, Pusa Road, Rajinder Nagar, New Delhi, Delhi 110005',
      },
      {
        name: 'Dr. Rohit Malhotra',
        location: 'Delhi',
        contact: '+91 91234 56793',
        address: 'AIIMS, Ansari Nagar East, New Delhi, Delhi 110029',
      },
    ],
    'Bangalore, Karnataka': [
      {
        name: 'Dr. Priya Menon',
        location: 'Bangalore, Karnataka',
        contact: '+91 99876 54321',
        address: 'National Institute of Mental Health and Neurosciences (NIMHANS), Hosur Road, Lakkasandra, Bangalore, Karnataka 560029',
      },
      {
        name: 'Dr. Siddharth Rao',
        location: 'Bangalore, Karnataka',
        contact: '+91 99876 54322',
        address: 'Bangalore Baptist Hospital, Bellary Road, Hebbal, Bangalore, Karnataka 560024',
      },
      {
        name: 'Dr. Aishwarya Nair',
        location: 'Bangalore, Karnataka',
        contact: '+91 99876 54323',
        address: 'Manipal Hospital, 98, HAL Old Airport Road, Bangalore, Karnataka 560017',
      },
      {
        name: 'Dr. Karan Shetty',
        location: 'Bangalore, Karnataka',
        contact: '+91 99876 54324',
        address: 'Columbia Asia Hospital, Kirloskar Business Park, Bellary Road, Hebbal, Bangalore, Karnataka 560024',
      },
      {
        name: 'Dr. Meera Iyer',
        location: 'Bangalore, Karnataka',
        contact: '+91 99876 54325',
        address: 'Aster CMI Hospital, No. 43/2, New Airport Road, NH 44, Sahakar Nagar, Bangalore, Karnataka 560092',
      },
    ],
    'Chennai, Tamil Nadu': [
      {
        name: 'Dr. Rohan Gupta',
        location: 'Chennai, Tamil Nadu',
        contact: '+91 97654 32109',
        address: 'Gleneagles Global Hospitals, 439, Cheran Nagar, Perumbakkam, Chennai, Tamil Nadu 600100',
      },
      {
        name: 'Dr. Lakshmi Balaji',
        location: 'Chennai, Tamil Nadu',
        contact: '+91 97654 32110',
        address: 'Chennai Neuro Centre, No. 1, 3rd Cross Street, Kasturba Nagar, Adyar, Chennai, Tamil Nadu 600020',
      },
      {
        name: 'Dr. Vinod Krishnan',
        location: 'Chennai, Tamil Nadu',
        contact: '+91 97654 32111',
        address: 'Apollo Hospitals, 21, Greams Lane, Off Greams Road, Chennai, Tamil Nadu 600006',
      },
      {
        name: 'Dr. Shreya Pillai',
        location: 'Chennai, Tamil Nadu',
        contact: '+91 97654 32112',
        address: 'Fortis Malar Hospital, No. 52, 1st Main Road, Gandhi Nagar, Adyar, Chennai, Tamil Nadu 600020',
      },
      {
        name: 'Dr. Arjun Reddy',
        location: 'Chennai, Tamil Nadu',
        contact: '+91 97654 32113',
        address: 'SRM Institutes for Medical Science, No. 1, Jawaharlal Nehru Salai, Vadapalani, Chennai, Tamil Nadu 600026',
      },
    ],
    'Kolkata, West Bengal': [
      {
        name: 'Dr. Sneha Das',
        location: 'Kolkata, West Bengal',
        contact: '+91 96543 21098',
        address: 'The Calcutta Medical Research Institute, 7/2 Diamond Harbour Road, Alipore, Kolkata, West Bengal 700027',
      },
      {
        name: 'Dr. Arindam Bose',
        location: 'Kolkata, West Bengal',
        contact: '+91 96543 21099',
        address: 'Jagruti Rehab Centre, 8/1, Alipore Road, Near Alipore Zoo, Kolkata, West Bengal 700027',
      },
      {
        name: 'Dr. Rina Sengupta',
        location: 'Kolkata, West Bengal',
        contact: '+91 96543 21100',
        address: 'Apollo Gleneagles Hospital, 58, Canal Circular Road, Kadapara, Phool Bagan, Kolkata, West Bengal 700054',
      },
      {
        name: 'Dr. Vikash Dutta',
        location: 'Kolkata, West Bengal',
        contact: '+91 96543 21101',
        address: 'Fortis Hospital, 730, Anandapur, E.M. Bypass Road, Kolkata, West Bengal 700107',
      },
      {
        name: 'Dr. Priyanka Roy',
        location: 'Kolkata, West Bengal',
        contact: '+91 96543 21102',
        address: 'AMRI Hospital, 230, Barakhola Lane, Purba Jadavpur, Mukundapur, Kolkata, West Bengal 700099',
      },
    ],
  };

  // State to track the selected city
  const [selectedCity, setSelectedCity] = useState('Mumbai, Maharashtra'); // Default to Mumbai

  const [hoveredCard, setHoveredCard] = useState(null);
  // List of cities for the dropdown
  const cities = Object.keys(psychiatristsByCity);

  return (
    <div
    style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      backgroundAttachment: 'fixed', // This keeps the gradient fixed while scrolling
      padding: '120px 20px 60px', // Increased top padding to account for fixed navbar
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      overflowY: 'auto', // Enables scrolling
      width: '100%',
      position: 'relative',
    }}
    >
      {/* Header Section */}
      <div
        style={{
          textAlign: 'center',
          marginBottom: '50px',
          padding: '20px',
          maxWidth: '800px',
        }}
      >
        <h1
          style={{
            fontSize: '48px',
            color: '#2c3e50',
            marginBottom: '20px',
            fontFamily: "'Poppins', sans-serif",
            fontWeight: '600',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)',
          }}
        >
          Meet Our Expert Psychiatrists
        </h1>
        <p
          style={{
            fontSize: '20px',
            color: '#34495e',
            lineHeight: '1.6',
            fontFamily: "'Roboto', sans-serif",
            maxWidth: '600px',
            margin: '0 auto',
          }}
        >
          Our team of experienced professionals is here to support your mental well-being journey
        </p>
      </div>

      {/* City Selection */}
      <div
        style={{
          marginBottom: '40px',
          background: 'rgba(255, 255, 255, 0.9)',
          padding: '30px 40px',
          borderRadius: '15px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
          width: '100%',
          maxWidth: '400px',
          textAlign: 'center',
        }}
      >
        <label
          style={{
            fontSize: '20px',
            color: '#2c3e50',
            marginBottom: '15px',
            display: 'block',
            fontFamily: "'Poppins', sans-serif",
            fontWeight: '500',
          }}
        >
          Select Your City
        </label>
        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          style={{
            width: '100%',
            padding: '15px 20px',
            fontSize: '18px',
            color: '#2c3e50',
            backgroundColor: '#fff',
            border: '2px solid #e0e6ed',
            borderRadius: '10px',
            outline: 'none',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            fontFamily: "'Roboto', sans-serif",
            appearance: 'none',
            backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 20px top 50%',
            backgroundSize: '12px auto',
          }}
        >
          {Object.keys(psychiatristsByCity).map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      {/* Psychiatrists Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '30px',
          maxWidth: '1400px',
          width: '100%',
          padding: '20px',
        }}
      >
        {psychiatristsByCity[selectedCity].map((psychiatrist, index) => (
          <div
            key={index}
            style={{
              background: 'rgba(255, 255, 255, 0.95)',
              borderRadius: '20px',
              padding: '30px',
              boxShadow: hoveredCard === index 
                ? '0 20px 40px rgba(0, 0, 0, 0.15)' 
                : '0 10px 20px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.3s ease',
              transform: hoveredCard === index ? 'translateY(-10px)' : 'translateY(0)',
              position: 'relative',
              overflow: 'hidden',
            }}
            onMouseEnter={() => setHoveredCard(index)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            {/* Doctor Icon */}
            <div
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #3498db, #2980b9)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
              }}
            >
              <i 
                className="fas fa-user-md" 
                style={{ 
                  fontSize: '32px', 
                  color: '#fff' 
                }}
              ></i>
            </div>

            <h3
              style={{
                fontSize: '24px',
                color: '#2c3e50',
                marginBottom: '15px',
                fontFamily: "'Poppins', sans-serif",
                fontWeight: '600',
                textAlign: 'center',
              }}
            >
              {psychiatrist.name}
            </h3>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                marginTop: '20px',
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                color: '#34495e',
              }}>
                <i className="fas fa-map-marker-alt" style={{ color: '#e74c3c' }}></i>
                <p style={{ margin: 0, fontSize: '16px' }}>{psychiatrist.location}</p>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                color: '#34495e',
              }}>
                <i className="fas fa-phone" style={{ color: '#27ae60' }}></i>
                <p style={{ margin: 0, fontSize: '16px' }}>{psychiatrist.contact}</p>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '10px',
                color: '#34495e',
              }}>
                <i className="fas fa-hospital" style={{ color: '#f39c12', marginTop: '4px' }}></i>
                <p style={{ 
                  margin: 0, 
                  fontSize: '16px',
                  lineHeight: '1.5',
                  textAlign: 'left',
                }}>
                  {psychiatrist.address}
                </p>
              </div>
            </div>

            {/* Contact Button */}
            
          </div>
        ))}
      </div>

      {/* Add Font Awesome */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
      />
    </div>
  );
}

export default MeetUs;