import { useState, useEffect } from 'react'
import $ from 'jquery'
import arrow from './assets/icon-arrow.svg'
import './index.css'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

function App() {
  const [input, setInput] = useState('')
  const [newData, setNewData] = useState()

  useEffect(() => {
    callAPI()
  }, [])

  const callAPI = () => {
    var ip = input
    var api_key = 'at_be7aewj19FpYXfKNxVTvRIlZ8NyiH'
    $(function () {
      $.ajax({
        url: 'https://geo.ipify.org/api/v1',
        data: { apiKey: api_key, ipAddress: ip },
        success: function (data) {
          setNewData(data)
        },
      })
    })
  }
  const SubmitHandler = async (event) => {
    event.preventDefault()
    callAPI()
  }

  return (
    <div className='App'>
      <main>
        <div className='background'>
          <div className='form-container'>
            <div className='title'>
              <p>IP Address Tracker</p>
            </div>
            <div className='ip-search'>
              <form onSubmit={SubmitHandler}>
                <input
                  className='ip-input'
                  placeholder='Search for any IP address'
                  type='text'
                  onChange={(event) => setInput(event.target.value)}
                />
                <button type='submit' className='arrow-btn'>
                  <img src={arrow} alt='My Happy SVG' />
                </button>
              </form>
            </div>
            <div className='show-info-container'>
              <div className='show-info'>
                <div className='info-box'>
                  <p className='details-type'>IP ADDRESS</p>
                  <p className='details-text'>{newData ? newData.ip : ''}</p>
                </div>
                <div className='info-box'>
                  <p className='details-type'>LOCATION</p>
                  <p className='details-text'>
                    {newData &&
                      `${newData.location.region}, ${newData.location.city} ${newData.location.postalCode}`}
                  </p>
                </div>
                <div className='info-box'>
                  <p className='details-type'>TIMEZONE</p>
                  <p className='details-text'>
                    {newData && `${newData.location.timezone} `}
                  </p>
                </div>
                <div className='info-box'>
                  <p className='details-type'>ISP</p>
                  <p className='details-text'>{newData && newData.isp}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <MapContainer
          style={{ height: '70vh', width: '100%' }}
          center={
            newData
              ? [newData.location.lat, newData.location.lng]
              : [37.40599, -122.078514]
          }
          zoom={3}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          />
          <Marker
            position={
              newData
                ? [newData.location.lat, newData.location.lng]
                : [37.40599, -122.078514]
            }
          >
            <Popup>
              Located at <br /> {newData && newData.location.city}
            </Popup>
          </Marker>
        </MapContainer>
      </main>
    </div>
  )
}

export default App
