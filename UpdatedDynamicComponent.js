import React, { useState, useEffect } from 'react';

const DynamicDropdownComponent = () => {
  const [channel, setChannel] = useState('');
  const [markets, setMarkets] = useState([]);
  const [market, setMarket] = useState('');
  const [programs, setPrograms] = useState([]);
  const [program, setProgram] = useState('');
  const [senderConfig, setSenderConfig] = useState(null);
  const [selectedSenderId, setSelectedSenderId] = useState('');

  // Updated mock data based on requirements
  const mockData = {
    channels: ['SMS', 'Push', 'Email', 'SMCE', 'Letter'],
    markets: {
      SMS: ['US', 'UK', 'India', 'SriLanka', 'Brazil', 'Canada', 'Australia'],
      Push: ['US', 'UK', 'India', 'Brazil', 'Germany', 'France'],
      Email: ['US', 'UK', 'India', 'SriLanka', 'Brazil', 'Japan', 'Singapore'],
      SMCE: ['India', 'SriLanka', 'Bangladesh', 'Pakistan', 'Nepal'],
      Letter: ['US', 'UK', 'Canada', 'Australia', 'New Zealand'],
    },
    programs: {
      US: ['ITSM', 'Transaction', 'OTP', 'Credit'],
      UK: ['ITSM', 'Transaction', 'OTP', 'Credit'],
      India: ['ITSM', 'Transaction', 'OTP', 'Credit'],
      SriLanka: ['ITSM', 'Transaction', 'OTP'],
      Brazil: ['ITSM', 'Transaction', 'Credit'],
      Canada: ['ITSM', 'Transaction', 'OTP', 'Credit'],
      Australia: ['ITSM', 'Transaction', 'OTP'],
      Germany: ['ITSM', 'Transaction', 'Credit'],
      France: ['ITSM', 'Transaction', 'OTP'],
      Japan: ['ITSM', 'Transaction', 'OTP', 'Credit'],
      Singapore: ['ITSM', 'Transaction', 'OTP'],
      Bangladesh: ['ITSM', 'OTP'],
      Pakistan: ['ITSM', 'Transaction'],
      Nepal: ['ITSM', 'OTP'],
      'New Zealand': ['ITSM', 'Transaction'],
    },
    senderConfigs: {
      ITSM: {
        senderIds: ['23000', '24000', '25000'],
        primary: '23000',
        active: '24000',
      },
      Transaction: {
        senderIds: ['31000', '32000', '33000', '34000'],
        primary: '31000',
        active: '33000',
      },
      OTP: {
        senderIds: ['41000', '42000'],
        primary: '41000',
        active: '42000',
      },
      Credit: {
        senderIds: ['51000', '52000', '53000'],
        primary: '51000',
        active: '52000',
      },
    },
  };

  // Simulate API call with delay
  const simulateApiCall = (data, delay = 500) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(data);
      }, delay);
    });
  };

  // Fetch markets when channel changes
  useEffect(() => {
    const fetchMarkets = async () => {
      if (channel) {
        try {
          // Simulate API call
          const data = await simulateApiCall(mockData.markets[channel] || []);
          setMarkets(data);
        } catch {
          setMarkets([]);
        }
        // Reset dependent fields
        setMarket('');
        setProgram('');
        setPrograms([]);
        setSenderConfig(null);
        setSelectedSenderId('');
      }
    };
    fetchMarkets();
    // eslint-disable-next-line
  }, [channel]);

  // Fetch programs when market changes
  useEffect(() => {
    const fetchPrograms = async () => {
      if (market) {
        try {
          // Simulate API call
          const data = await simulateApiCall(mockData.programs[market] || []);
          setPrograms(data);
        } catch {
          setPrograms([]);
        }
        // Reset dependent fields
        setProgram('');
        setSenderConfig(null);
        setSelectedSenderId('');
      }
    };
    fetchPrograms();
    // eslint-disable-next-line
  }, [market]);

  // Fetch sender config when program changes
  useEffect(() => {
    const fetchSenderConfig = async () => {
      if (program) {
        try {
          // Simulate API call
          const data = await simulateApiCall(mockData.senderConfigs[program] || null);
          setSenderConfig(data);
          // Set default selection to active sender ID
          if (data && data.active) {
            setSelectedSenderId(data.active);
          }
        } catch {
          setSenderConfig(null);
        }
      } else {
        setSenderConfig(null);
      }
    };
    fetchSenderConfig();
    // eslint-disable-next-line
  }, [program]);

  const handleSubmit = () => {
    const formData = {
      channel,
      market,
      program,
      selectedSenderId,
      senderConfig: senderConfig
        ? {
            primary: senderConfig.primary,
            active: senderConfig.active,
            selected: selectedSenderId,
          }
        : null,
    };
    console.log('Form Data:', formData);
    alert(
      `Selected Configuration:\nChannel: ${channel}\nMarket: ${market}\nProgram: ${program}\nSelected Sender ID: ${selectedSenderId}`
    );
  };

  const getSenderIdLabel = (senderId) => {
    if (!senderConfig) return senderId;
    let label = senderId;
    if (senderId === senderConfig.primary) label += ' (Primary)';
    if (senderId === senderConfig.active) label += ' (Active)';
    return label;
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Dynamic Communication Setup</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Channel Dropdown */}
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Channel:
          </label>
          <select
            value={channel}
            onChange={(e) => setChannel(e.target.value)}
            style={{ width: '100%', padding: '8px', fontSize: '14px' }}
          >
            <option value="">Select Channel</option>
            {mockData.channels.map((ch) => (
              <option key={ch} value={ch}>
                {ch}
              </option>
            ))}
          </select>
        </div>

        {/* Market Dropdown */}
        {markets.length > 0 && (
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Market:
            </label>
            <select
              value={market}
              onChange={(e) => setMarket(e.target.value)}
              style={{ width: '100%', padding: '8px', fontSize: '14px' }}
            >
              <option value="">Select Market</option>
              {markets.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Program Name Dropdown */}
        {programs.length > 0 && (
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Program Name:
            </label>
            <select
              value={program}
              onChange={(e) => setProgram(e.target.value)}
              style={{ width: '100%', padding: '8px', fontSize: '14px' }}
            >
              <option value="">Select Program</option>
              {programs.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Sender ID Radio Buttons */}
        {senderConfig && senderConfig.senderIds && (
          <div>
            <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>
              Select Sender ID:
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {senderConfig.senderIds.map((senderId) => (
                <label
                  key={senderId}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                    padding: '5px',
                    borderRadius: '4px',
                    backgroundColor: selectedSenderId === senderId ? '#e3f2fd' : 'transparent',
                  }}
                >
                  <input
                    type="radio"
                    name="senderId"
                    value={senderId}
                    checked={selectedSenderId === senderId}
                    onChange={(e) => setSelectedSenderId(e.target.value)}
                    style={{ marginRight: '8px' }}
                  />
                  <span style={{ fontSize: '14px' }}>{getSenderIdLabel(senderId)}</span>
                </label>
              ))}
            </div>

            {/* Config Info Display */}
            <div
              style={{
                marginTop: '10px',
                padding: '10px',
                backgroundColor: '#f5f5f5',
                borderRadius: '4px',
                fontSize: '12px',
              }}
            >
              <p>
                <strong>Primary Sender ID:</strong> {senderConfig.primary}
              </p>
              <p>
                <strong>Active Sender ID:</strong> {senderConfig.active}
              </p>
            </div>
          </div>
        )}

        {/* Submit Button */}
        {selectedSenderId && (
          <button
            type="button"
            onClick={handleSubmit}
            style={{
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '16px',
            }}
          >
            Submit Configuration
          </button>
        )}
      </div>

      {/* Current Selection Display */}
      <div style={{ marginTop: '30px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
        <h3>Current Selection:</h3>
        <p>
          <strong>Channel:</strong> {channel}
        </p>
        {market && (
          <p>
            <strong>Market:</strong> {market}
          </p>
        )}
        {program && (
          <p>
            <strong>Program:</strong> {program}
          </p>
        )}
        {selectedSenderId && (
          <p>
            <strong>Selected Sender ID:</strong> {selectedSenderId}
          </p>
        )}
        {senderConfig && (
          <div style={{ marginTop: '10px' }}>
            <p>
              <strong>Available Sender IDs:</strong> {senderConfig.senderIds.join(', ')}
            </p>
            <p>
              <strong>Primary:</strong> {senderConfig.primary} | <strong>Active:</strong> {senderConfig.active}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DynamicDropdownComponent;
